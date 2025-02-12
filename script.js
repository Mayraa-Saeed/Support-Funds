// Common Functions

// Fade-out loader effect
function fadeOutEffect() {
    const loader = document.querySelector(".loader-wrap");
    const body = document.body;
    let opacity = 1;
    const fadeEffect = setInterval(function () {
      if (opacity > 0) {
        opacity -= 0.1;
        loader.style.opacity = opacity;
      } else {
        clearInterval(fadeEffect);
        loader.style.display = 'none';
        body.classList.remove('stop-scroll');
      }
    }, 50);
  }
  
  // Toggle navigation menu
  function toggleMenu() {
    const nav = document.querySelector("nav");
    const toggle = document.querySelector(".toggle");
    nav.classList.toggle("active");
    toggle.classList.toggle("active");
  }
  
  // Navigation links active state on click
  const navLinks = document.querySelectorAll('.navigation-bar a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(link => link.parentElement.classList.remove('active'));
      this.parentElement.classList.add('active');
    });
  });
  
  // Set active link on DOMContentLoaded based on current URL
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navigation-bar a");
    const currentPageUrl = window.location.href;
    navLinks.forEach(link => {
      if (link.href === currentPageUrl) {
        link.parentElement.classList.add("active");
      }
      link.addEventListener("click", function () {
        navLinks.forEach(nav => nav.parentElement.classList.remove("active"));
        this.parentElement.classList.add("active");
      });
    });
  });
  
  window.onload = function () {
    fadeOutEffect();
  };
  
  // Multi-step form logic
  
  const steps = document.querySelectorAll('.step');
  const sidebarItems = document.querySelectorAll('.step-item');
  const nextBtns = document.querySelectorAll('.next-btn');
  const prevBtns = document.querySelectorAll('.prev-btn');
  let currentStep = 0;
  
  // Utility: Clear error messages for given element IDs
  function clearErrors(ids) {
    ids.forEach(id => {
      const errorElement = document.getElementById(id);
      if (errorElement) {
        errorElement.innerText = "";
      }
    });
  }
  
  // Update sidebar active state
  function updateSidebar() {
    sidebarItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentStep);
    });
  }
  
  // Validate inputs on the current step before moving to the next
  function validateStep(stepIndex) {
    let valid = true;
  
    if (document.getElementById("borrower")) {
      // Borrower Form Validation
      if (stepIndex === 0) {
        // Step 0: Personal Details (Part 1)
        clearErrors(["error-nationalID", "error-firstName", "error-lastName", "error-dob"]);
        const nationalID = document.getElementById("nationalID").value.trim();
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const dob = document.getElementById("dob").value;
        if (!nationalID) {
          document.getElementById("error-nationalID").innerText = "Please enter your National ID.";
          valid = false;
        } else if (!/^\d{13}$/.test(nationalID)) {
          document.getElementById("error-nationalID").innerText = "National ID must be exactly 13 digits.";
          valid = false;
        }
        if (!firstName) {
          document.getElementById("error-firstName").innerText = "Please enter your first name.";
          valid = false;
        }
        if (!lastName) {
          document.getElementById("error-lastName").innerText = "Please enter your last name.";
          valid = false;
        }
        if (!dob) {
          document.getElementById("error-dob").innerText = "Please select your date of birth.";
          valid = false;
        } else {
          // Calculate age to ensure applicant is at least 18
          let birthDate = new Date(dob);
          let today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          let m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age < 18) {
            document.getElementById("error-dob").innerText = "You must be at least 18 years old.";
            valid = false;
          }
        }
      } else if (stepIndex === 1) {
        // Step 1: Personal Details (Part 2)
        clearErrors(["error-address", "error-phonePersonal", "error-maritalStatus", "error-numberDependents"]);
        const address = document.getElementById("address").value.trim();
        const phonePersonal = document.getElementById("phonePersonal").value.trim();
        const maritalStatus = document.getElementById("maritalStatus").value;
        const numberDependents = document.getElementById("numberDependents").value;
        if (!address) {
          document.getElementById("error-address").innerText = "Please enter your address.";
          valid = false;
        }
        if (!phonePersonal) {
          document.getElementById("error-phonePersonal").innerText = "Please enter your phone number.";
          valid = false;
        } else if (!/^\d{11}$/.test(phonePersonal)) {
          document.getElementById("error-phonePersonal").innerText = "Phone number must be exactly 11 digits.";
          valid = false;
        }
        if (!maritalStatus) {
          document.getElementById("error-maritalStatus").innerText = "Please select your marital status.";
          valid = false;
        }
        if (numberDependents === "" || numberDependents < 0) {
          document.getElementById("error-numberDependents").innerText = "Please enter the number of dependents (0 or more).";
          valid = false;
        }
      } else if (stepIndex === 2) {
        // Step 2: Account Details
        clearErrors(["error-email", "error-password", "error-confirmPassword"]);
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?!example\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
          document.getElementById("error-email").innerText = "Please enter your email.";
          valid = false;
        } else if (!emailRegex.test(email)) {
          document.getElementById("error-email").innerText = "Enter a valid email address not from example.com.";
          valid = false;
        }
        if (!password) {
          document.getElementById("error-password").innerText = "Please enter your password.";
          valid = false;
        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(password)) {
            document.getElementById("error-password").innerText = "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, and a digit.";
            valid = false;
          }
        }
        if (!confirmPassword) {
          document.getElementById("error-confirmPassword").innerText = "Please confirm your password.";
          valid = false;
        } else if (password !== confirmPassword) {
          document.getElementById("error-confirmPassword").innerText = "Passwords do not match.";
          valid = false;
        }
      } else if (stepIndex === 3) {
        // Step 3: Business Idea
        clearErrors(["error-businessIdea", "error-businessType", "error-otherBusinessType", "error-businessLocation"]);
        const businessIdea = document.getElementById("businessIdea").value.trim();
        const businessType = document.getElementById("businessType").value;
        const otherBusinessType = document.getElementById("otherBusinessType") ? document.getElementById("otherBusinessType").value.trim() : "";
        const businessLocation = document.getElementById("businessLocation").value.trim();
        if (!businessIdea) {
          document.getElementById("error-businessIdea").innerText = "Please describe your business idea.";
          valid = false;
        }
        if (!businessType) {
          document.getElementById("error-businessType").innerText = "Please select your business type.";
          valid = false;
        } else if (businessType === "other" && !otherBusinessType) {
          document.getElementById("error-otherBusinessType").innerText = "Please specify your business type.";
          valid = false;
        }
        if (!businessLocation) {
          document.getElementById("error-businessLocation").innerText = "Please enter your business location.";
          valid = false;
        }
      } else if (stepIndex === 4) {
        // Step 4: Business Concept
        clearErrors(["error-startDate", "error-loanAmount", "error-fundsUse"]);
        const startDate = document.getElementById("startDate").value;
        const loanAmount = document.getElementById("loanAmount").value;
        const fundsUse = document.getElementById("fundsUse").value.trim();
        if (!startDate) {
          document.getElementById("error-startDate").innerText = "Please select your expected start date.";
          valid = false;
        }
        if (!loanAmount) {
          document.getElementById("error-loanAmount").innerText = "Please enter the loan amount requested.";
          valid = false;
        }
        if (!fundsUse) {
          document.getElementById("error-fundsUse").innerText = "Please explain the intended use of funds.";
          valid = false;
        }
      } else if (stepIndex === 5) {
        // Step 5: Financial Information (Part 1)
        clearErrors(["error-monthlyIncome", "error-householdIncome", "error-savingsAssets"]);
        const monthlyIncome = document.getElementById("monthlyIncome").value;
        const householdIncome = document.getElementById("householdIncome").value;
        const savingsAssets = document.getElementById("savingsAssets").value.trim();
        if (!monthlyIncome) {
          document.getElementById("error-monthlyIncome").innerText = "Please enter your monthly income.";
          valid = false;
        }
        if (!householdIncome) {
          document.getElementById("error-householdIncome").innerText = "Please enter your household income.";
          valid = false;
        }
        if (!savingsAssets) {
          document.getElementById("error-savingsAssets").innerText = "Please provide details of your savings or assets.";
          valid = false;
        }
      } else if (stepIndex === 6) {
        // Step 6: Financial Information (Part 2)
        clearErrors(["error-liabilities", "error-businessExperience", "error-repaymentSchedule"]);
        const liabilities = document.getElementById("liabilities").value.trim();
        const businessExperience = document.getElementById("businessExperience").value.trim();
        const repaymentSchedule = document.getElementById("repaymentSchedule").value.trim();
        if (!liabilities) {
          document.getElementById("error-liabilities").innerText = "Please list your liabilities or debts.";
          valid = false;
        }
        if (!businessExperience) {
          document.getElementById("error-businessExperience").innerText = "Please provide details of your business experience.";
          valid = false;
        }
        if (!repaymentSchedule) {
          document.getElementById("error-repaymentSchedule").innerText = "Please specify your proposed repayment schedule.";
          valid = false;
        }
      } else if (stepIndex === 7) {
        // Step 7: Guarantor Details (Part 1)
        clearErrors(["error-guarantor1Name", "error-guarantor1Location", "error-guarantor1CNIC"]);
        const guarantor1Name = document.getElementById("guarantor1Name").value.trim();
        const guarantor1Location = document.getElementById("guarantor1Location").value.trim();
        const guarantor1CNIC = document.getElementById("guarantor1CNIC").files;
        if (!guarantor1Name) {
          document.getElementById("error-guarantor1Name").innerText = "Please enter Guarantor 1's name.";
          valid = false;
        }
        if (!guarantor1Location) {
          document.getElementById("error-guarantor1Location").innerText = "Please enter Guarantor 1's location.";
          valid = false;
        }
        if (!guarantor1CNIC || guarantor1CNIC.length === 0) {
          document.getElementById("error-guarantor1CNIC").innerText = "Please upload Guarantor 1's CNIC picture.";
          valid = false;
        }
      } else if (stepIndex === 8) {
        // Step 8: Guarantor Details (Part 2)
        clearErrors(["error-guarantor2Name", "error-guarantor2Location", "error-guarantor2CNIC"]);
        const guarantor2Name = document.getElementById("guarantor2Name").value.trim();
        const guarantor2Location = document.getElementById("guarantor2Location").value.trim();
        const guarantor2CNIC = document.getElementById("guarantor2CNIC").files;
        if (!guarantor2Name) {
          document.getElementById("error-guarantor2Name").innerText = "Please enter Guarantor 2's name.";
          valid = false;
        }
        if (!guarantor2Location) {
          document.getElementById("error-guarantor2Location").innerText = "Please enter Guarantor 2's location.";
          valid = false;
        }
        if (!guarantor2CNIC || guarantor2CNIC.length === 0) {
          document.getElementById("error-guarantor2CNIC").innerText = "Please upload Guarantor 2's CNIC picture.";
          valid = false;
        }
      } else if (stepIndex === 9) {
        // Step 9: Supporting Documents
        clearErrors(["error-nationalIDUpload", "error-residenceProof", "error-financialDocs"]);
        const nationalIDUpload = document.getElementById("nationalIDUpload").files;
        const residenceProof = document.getElementById("residenceProof").files;
        const financialDocs = document.getElementById("financialDocs").files;
        if (!nationalIDUpload || nationalIDUpload.length === 0) {
          document.getElementById("error-nationalIDUpload").innerText = "Please upload your National ID copy.";
          valid = false;
        }
        if (!residenceProof || residenceProof.length === 0) {
          document.getElementById("error-residenceProof").innerText = "Please upload your proof of residence.";
          valid = false;
        }
        if (!financialDocs || financialDocs.length === 0) {
          document.getElementById("error-financialDocs").innerText = "Please upload your financial documents.";
          valid = false;
        }
      }
    } else if (document.getElementById("mentor")) {
      // Mentor Form Validation
      if (stepIndex === 0) {
        // Step 0: Personal Details
        clearErrors(["error-firstName", "error-lastName"]);
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        if (!firstName) {
          document.getElementById("error-firstName").innerText = "Please enter your first name.";
          valid = false;
        }
        if (!lastName) {
          document.getElementById("error-lastName").innerText = "Please enter your last name.";
          valid = false;
        }
      } else if (stepIndex === 1) {
        // Step 1: Account Details
        clearErrors(["error-email", "error-password", "error-confirmPassword"]);
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?!example\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
          document.getElementById("error-email").innerText = "Please enter your email.";
          valid = false;
        } else if (!emailRegex.test(email)) {
          document.getElementById("error-email").innerText = "Please enter a valid email address that is not from example.com.";
          valid = false;
        }
        if (!password) {
          document.getElementById("error-password").innerText = "Please enter your password.";
          valid = false;
        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(password)) {
            document.getElementById("error-password").innerText = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.";
            valid = false;
          }
        }
        if (!confirmPassword) {
          document.getElementById("error-confirmPassword").innerText = "Please confirm your password.";
          valid = false;
        } else if (password !== confirmPassword) {
          document.getElementById("error-confirmPassword").innerText = "Password and Confirm Password must match.";
          valid = false;
        }
      } else if (stepIndex === 2) {
        // Step 2: Mentoring Details
        clearErrors(["error-PhoneNumber", "error-expertise", "error-otherExpertise"]);
        const phoneNumber = document.getElementById("PhoneNumber").value.trim();
        const expertise = document.getElementById("expertise").value;
        const otherExpertise = document.getElementById("otherExpertise") ? document.getElementById("otherExpertise").value.trim() : "";
        if (!phoneNumber) {
          document.getElementById("error-PhoneNumber").innerText = "Please enter your phone number.";
          valid = false;
        } else {
          const phoneRegex = /^\d{11}$/;
          if (!phoneRegex.test(phoneNumber)) {
            document.getElementById("error-PhoneNumber").innerText = "Phone number must be exactly 11 digits.";
            valid = false;
          }
        }
        if (!expertise) {
          document.getElementById("error-expertise").innerText = "Please select your field of expertise.";
          valid = false;
        } else if (expertise === "other" && !otherExpertise) {
          document.getElementById("error-otherExpertise").innerText = "Please specify your field of expertise.";
          valid = false;
        }
      } else if (stepIndex === 3) {
        // Step 3: Supporting Documents
        clearErrors(["error-resume", "error-profilePicture"]);
        const resumeInput = document.getElementById("resume");
        const profilePictureInput = document.getElementById("profilePicture");
                if (resumeInput && resumeInput.files.length === 0) {
                    document.getElementById("error-resume").innerText = "Please upload your resume.";
                    valid = false;
                } else if (resumeInput && resumeInput.files.length > 0) {
                    const resumeFile = resumeInput.files[0];
                    const allowedResumeTypes = [
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ];
                    if (!allowedResumeTypes.includes(resumeFile.type)) {
                        document.getElementById("error-resume").innerText = "Invalid file type for resume. Allowed types: PDF, DOC, DOCX.";
                        valid = false;
                    }
                }
                if (profilePictureInput && profilePictureInput.files.length === 0) {
                    document.getElementById("error-profilePicture").innerText = "Please upload your profile picture.";
                    valid = false;
                } else if (profilePictureInput && profilePictureInput.files.length > 0) {
                    const profileFile = profilePictureInput.files[0];
                    const allowedProfileTypes = ['image/jpeg', 'image/png'];
                    if (!allowedProfileTypes.includes(profileFile.type)) {
                        document.getElementById("error-profilePicture").innerText = "Invalid file type for profile picture. Allowed types: JPEG, PNG.";
                        valid = false;
                    }
                }
            } else if (stepIndex === 4) {
                // Step 4: Terms and Conditions (no extra validation required)
            }
        } else if (document.getElementById("funders")) {
            // Funder Form Validation
            if (stepIndex === 0) {
                // Step 0: Personal Details
                clearErrors(["error-nationalID", "error-firstName", "error-lastName"]);
                const nationalID = document.getElementById("nationalID").value.trim();
                const firstName = document.getElementById("firstName").value.trim();
                const lastName = document.getElementById("lastName").value.trim();
                if (!nationalID) {
                    document.getElementById("error-nationalID").innerText = "Please enter your National Identity Number.";
                    valid = false;
                } else {
                    const nationalIDRegex = /^\d{13}$/;
                    if (!nationalIDRegex.test(nationalID)) {
                        document.getElementById("error-nationalID").innerText = "National Identity Number must be exactly 13 digits.";
                        valid = false;
                    }
                }
                if (!firstName) {
                    document.getElementById("error-firstName").innerText = "Please enter your first name.";
                    valid = false;
                }
                if (!lastName) {
                    document.getElementById("error-lastName").innerText = "Please enter your last name.";
                    valid = false;
                }
            } else if (stepIndex === 1) {
                // Step 1: Account Details
                clearErrors(["error-email", "error-password", "error-confirmPassword"]);
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                const confirmPassword = document.getElementById("confirmPassword").value;
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(?!example\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!email) {
                    document.getElementById("error-email").innerText = "Please enter your email.";
                    valid = false;
                } else if (!emailRegex.test(email)) {
                    document.getElementById("error-email").innerText = "Please enter a valid email address that is not from example.com.";
                    valid = false;
                }
                if (!password) {
                    document.getElementById("error-password").innerText = "Please enter your password.";
                    valid = false;
                } else {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                    if (!passwordRegex.test(password)) {
                        document.getElementById("error-password").innerText = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.";
                        valid = false;
                    }
                }
                if (!confirmPassword) {
                    document.getElementById("error-confirmPassword").innerText = "Please confirm your password.";
                    valid = false;
                } else if (password !== confirmPassword) {
                    document.getElementById("error-confirmPassword").innerText = "Password and Confirm Password must match.";
                    valid = false;
                }
            } else if (stepIndex === 2) {
                // Step 2: Loan Details
                clearErrors(["error-PhoneNumber", "error-organizationType", "error-otherOrganization"]);
                const phoneNumber = document.getElementById("PhoneNumber").value.trim();
                const orgType = document.getElementById("organizationType").value;
                const otherOrg = document.getElementById("otherOrganization")?.value.trim();
                if (!phoneNumber) {
                    document.getElementById("error-PhoneNumber").innerText = "Please enter your Phone Number.";
                    valid = false;
                } else {
                    const phoneRegex = /^\d{11}$/;
                    if (!phoneRegex.test(phoneNumber)) {
                        document.getElementById("error-PhoneNumber").innerText = "Phone Number must be exactly 11 digits.";
                        valid = false;
                    }
                }
                if (!orgType) {
                    document.getElementById("error-organizationType").innerText = "Please select an organization type.";
                    valid = false;
                } else if (orgType === "other" && !otherOrg) {
                    document.getElementById("error-otherOrganization").innerText = "Please specify your organization type.";
                    valid = false;
                }
            }
        }
        return valid;
    }

    // Next button event: Validate before moving to the next step
    nextBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (!validateStep(currentStep)) {
                return; // Stop if validation fails
            }
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
            updateSidebar();
        });
    });

    // Previous button event: Simply go back one step
    prevBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            steps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.add('active');
            updateSidebar();
        });
    });

    // Show/hide "Other" expertise/organization field based on selection
    document.getElementById("expertise")?.addEventListener("change", function () {
        const otherField = document.getElementById("otherField");
        if (this.value === "other") {
            otherField.style.display = "block";
        } else {
            otherField.style.display = "none";
        }
    });

    document.getElementById("organizationType")?.addEventListener("change", function () {
        const otherField = document.getElementById("otherField");
        if (this.value === "other") {
            otherField.style.display = "block";
        } else {
            otherField.style.display = "none";
        }
    });

    // Enable the submit button only when the Terms and Conditions checkbox is checked.
    document.getElementById("agreeTerms")?.addEventListener("change", function () {
        document.getElementById("submitBtn").disabled = !this.checked;
    });

    // Extra safeguard: Prevent submission if the Terms checkbox isn't checked.
    document.getElementById("submitBtn")?.addEventListener("click", function (e) {
        if (!document.getElementById("agreeTerms").checked) {
            e.preventDefault();
            alert("Please agree to the Terms and Conditions to proceed.");
        } else {
            // Place your actual form submission logic here
            alert("Form submitted successfully!");
        }
    });
