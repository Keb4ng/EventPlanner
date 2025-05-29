var app = {
  programSearchBox: () => {
    const searchBox = $("#search-box");
    const dropdown = $("#dropdown");

    const programs = [
      "Computer Science",
      "Business Administration",
      "Engineering",
      "Psychology",
      "Artificial Intelligence",
      "Marketing Management",
      "Civil Engineering",
      "Accounting & Finance",
      "Acting",
      "Art History",
      "Artificial Intelligence",
      "Business Management",
      "Childhood & Youth",
      "Conservation Biology",
      "Contemporary Craft",
      "Contemporary Fashion Design",
      "Creative Industries Business Management",
      "Creative Writing",
      "Criminology",
      "Dance",
      "Digital Creativity",
      "Digital Marketing",
      "Drama",
      "Drama & Theatre",
      "Early Childhood",
      "Early Education Primary (3-7) with QTS",
      "Economics",
      "Education",
      "Electronic & Computer Engineering",
      "English Language",
      "English Literature",
      "Environmental Geography",
      "Environmental Science",
      "Film & Visual Culture",
      "Film, TV, Radio & Media Production",
      "Fine Art",
      "Food & Nutritional Sciences",
      "Geography",
      "Global Philosophies & Worldviews",
      "Graphic Design",
      "Health & Social Care",
      "Health & Wellbeing",
      "History",
      "Human Biology",
      "Human Geography",
      "Information Technology",
      "International Relations",
      "Law",
      "Law LLB",
      "Mathematics",
      "Media & Communication",
      "Music",
      "Music Production",
      "Musical Theatre",
      "Philosophy & Ethics",
      "Physical Geography",
      "Politics",
      "Politics & International Relations",
      "Primary Education (5-11) with QTS",
      "Psychology in Business",
      "Psychology in Education",
      "Religion, Theology and Spirituality",
      "Robotics",
      "Social Care",
      "Social Work",
      "Sociology",
      "Software Engineering",
      "Special Educational Needs",
      "Special Educational Needs & Disability Studies",
      "Sport & Exercise Nutrition",
      "Sport & Exercise Science",
      "Sport & Physical Education",
      "Sport Management",
      "Sport Psychology",
      "Sport Rehabilitation",
      "Tourism",
      "Tourism Management",
    ];

    searchBox.on("input", function () {
      const searchText = $(this).val().toLowerCase();
      dropdown.empty();
      dropdown.toggle(!!searchText);

      programs
        .filter((p) => p.toLowerCase().includes(searchText))
        .forEach((program) => {
          const div = $("<div>").text(program);
          div.on("click", function () {
            searchBox.val(program);
            dropdown.hide();
          });
          dropdown.append(div);
        });
    });

    $(document).on("click", function (event) {
      if (!$(event.target).is(searchBox) && !dropdown.has(event.target).length) {
        dropdown.hide();
      }
    });
  },

  register: () => {
    $("#registerForm").submit(function (event) {
      event.preventDefault();

      let username = $("#regUsername").val();
      let password = $("#regPassword").val();
      let name = $("#regFirstName").val() + " " + $("#regLastName").val();
      let email = $("#regEmail").val();

      if (localStorage.getItem(username)) {
        $("#regMessage").text("Username already exists!").css("color", "red");
      } else {
        localStorage.setItem(username, password, name, email);
        $("#regMessage").text("Registration successful!").css("color", "green");
      }

      $("#registerForm")[0].reset();
    });
  },

  login: () => {
    $("#loginForm").submit(function (event) {
      event.preventDefault();

      let username = $("#loginUsername").val().trim();
      let password = $("#loginPassword").val().trim();

      if (localStorage.getItem(username) === password) {
        $("#regMessage").text("Login successful! Redirecting...").css("color", "green");

        setTimeout(() => {
          window.location.href = "./portal-index.html";
        }, 1000);
      } else {
        $("#regMessage").text("Invalid username or password!").css("color", "red");
      }

      $("#loginForm")[0].reset();
    });
  },

  selectProgram: () => {
    $("#form-btn-nxt").click(function (event) {
      event.preventDefault();
      let isValid = true;
      function validateField(selector) {
        let value = $(selector).val();
        if (value === "") {
          $(selector).css("border", "2px solid red");
          isValid = false;
        } else {
          $(selector).css("border", "");
        }
        return value;
      }

      let programName = validateField("#search-box");
      let intakePeriod = validateField($("input[type='date']").eq(0));
      let deadlines = validateField($("input[type='date']").eq(1));

      if ($("input[name='degree-type']:checked").length === 0) {
        $(".form-radios").css("border", "1px solid red");
        isValid = false;
      } else {
        $(".form-radios").css("border", "");
      }

      if (isValid) {
        let selectProgramData = {
          programName,
          degreeType: $("input[name='degree-type']:checked").parent().text().trim(),
          intakePeriod,
          deadlines,
        };

        localStorage.setItem("selectProgram", JSON.stringify(selectProgramData));
        window.location.href = "applicant-hub__p2.html";
      } else {
        console.log("error saving");
      }
    });
  },

  personalInfo: () => {
    $("#form-btn-p2").click(function (event) {
      event.preventDefault();
      console.log(333);
      let isValid = true;

      function validateField(selector) {
        let value = $(selector).val().trim();
        if (value === "") {
          $(selector).css("border", "2px solid red");
          isValid = false;
        } else {
          $(selector).css("border", "");
        }
        return value;
      }

      let nameTitle = validateField("#nameTitle");
      let firstName = validateField("#firstName");
      let lastName = validateField("#lastName");
      let prevName = $("#prevName").val();
      let gender = validateField("#gender");
      let countryOfBirth = validateField("#countryOfBirth");
      let nationality = validateField("#nationality");
      let birthDay = validateField("#birthDay");
      let birthMonth = validateField("#birthMonth");
      let birthYear = validateField("#birthYear");

      if (isValid) {
        let personalInfoData = {
          nameTitle,
          firstName,
          lastName,
          prevName,
          gender,
          countryOfBirth,
          nationality,
          birthDay,
          birthMonth,
          birthYear,
        };

        localStorage.setItem("personalInfo", JSON.stringify(personalInfoData));
        window.location.href = "applicant-hub__p3.html";
      } else {
        console.log("error saving");
      }
    });
  },

  paymentMethod: () => {
    $("input[name='payment']").on("change", function () {
      $(".payment-section").hide();
      $("#" + $(this).val()).show();
    });

    $("#savePayment").on("click", function () {
      let paymentData = {};
      let selectedMethod = $("input[name='payment']:checked").val();

      if (!selectedMethod) {
        alert("Please select a payment method.");
        return;
      }

      let isValid = true;

      if (selectedMethod === "credit") {
        paymentData = {
          method: "Credit Card",
          bankName: $("#bankName").val().trim(),
          cardNumber: $("#cardNumber").val().trim(),
          holderName: $("#holderName").val().trim(),
          expiryMM: $("#expiryMM").val().trim(),
          expiryYY: $("#expiryYY").val().trim(),
          cvv: $("#cvv").val().trim(),
        };

        if (
          !paymentData.bankName ||
          !paymentData.cardNumber ||
          !paymentData.holderName ||
          !paymentData.expiryMM ||
          !paymentData.expiryYY ||
          !paymentData.cvv
        ) {
          isValid = false;
        }
      } else if (selectedMethod === "paypal") {
        paymentData = {
          method: "PayPal",
          paypalEmail: $("#paypalEmail").val().trim(),
        };

        if (!paymentData.paypalEmail) {
          isValid = false;
        }
      } else if (selectedMethod === "bank") {
        paymentData = {
          method: "Bank Transfer",
          bankName: $("#transferBankName").val().trim(),
          accountNumber: $("#accountNumber").val().trim(),
          ifscCode: $("#ifscCode").val().trim(),
        };

        if (!paymentData.bankName || !paymentData.accountNumber || !paymentData.ifscCode) {
          isValid = false;
        }
      }

      if (!isValid) {
        alert("Please fill in all required fields.");
        return;
      }

      localStorage.setItem("paymentData", JSON.stringify(paymentData));
      alert("Payment information saved successfully!");

      window.location.href = "./applicant-hub__p6.html";
    });
  },

  educationInfo: () => {
    $("#form-btn-p3").click(function (event) {
      event.preventDefault();
      let isValid = true;

      function validateField(selector) {
        let value = $(selector).val().trim();
        if (value === "") {
          $(selector).css("border", "2px solid red");
          isValid = false;
        } else {
          $(selector).css("border", "");
        }
        return value;
      }

      let typeOfInstitutions = validateField("#typeOfInstitutions");
      let nameOfInstitution = validateField("#nameOfInstitution");
      let cityOfInstitution = validateField("#cityOfInstitution");
      let countryOfInstitution = $("#countryOfInstitution").val().trim();
      let qualifications = validateField("#qualifications");
      let titleOfProgram = validateField("#titleOfProgram");
      let expectedResult = validateField("#expectedResult");
      let startDate = validateField("#startDate");
      let endDate = validateField("#endDate");

      if (isValid) {
        let educationInfoData = {
          typeOfInstitutions,
          nameOfInstitution,
          cityOfInstitution,
          countryOfInstitution,
          qualifications,
          titleOfProgram,
          expectedResult,
          startDate,
          endDate,
        };

        localStorage.setItem("educationInfo", JSON.stringify(educationInfoData));
        window.location.href = "applicant-hub__p4.html";
      } else {
        console.log("error saving");
      }
    });
  },

  confirmAndSubmit: () => {
    let personalInfo = JSON.parse(localStorage.getItem("personalInfo") || "{}");
    let educationInfo = JSON.parse(localStorage.getItem("educationInfo") || "{}");
    let selectProgram = JSON.parse(localStorage.getItem("selectProgram") || "{}");

    $("#nameTitle").val(personalInfo.nameTitle || "");
    $("#firstName").val(personalInfo.firstName || "");
    $("#lastName").val(personalInfo.lastName || "");
    $("#prevName").val(personalInfo.prevName || "");
    $("#gender").val(personalInfo.gender || "");
    $("#nationality").val(personalInfo.nationality || "");
    $("#countryOfBirth").val(personalInfo.countryOfBirth || "");
    $("#birthDay").val(personalInfo.birthDay || "");
    $("#birthMonth").val(personalInfo.birthMonth || "");
    $("#birthYear").val(personalInfo.birthYear || "");

    $("#typeOfInstitutions").val(educationInfo.typeOfInstitutions || "");
    $("#nameOfInstitution").val(educationInfo.nameOfInstitution || "");
    $("#cityOfInstitution").val(educationInfo.cityOfInstitution || "");
    $("#countryOfInstitution").val(educationInfo.countryOfInstitution || "");
    $("#startDate").val(educationInfo.startDate || "");
    $("#endDate").val(educationInfo.endDate || "");
    $("#titleOfProgram").val(educationInfo.titleOfProgram || "");
    $("#qualifications").val(educationInfo.qualifications || "");
    $("#expectedResult").val(educationInfo.expectedResult || "");

    $("#search-box").val(selectProgram.programName || "");
    $("#intakePeriod").val(selectProgram.intakePeriod || "");
    $("#deadlines").val(selectProgram.deadlines || "");
    if (selectProgram.degreeType) {
      $(`input[name="degree-type"][value="${selectProgram.degreeType}"]`).prop("checked", true);
    }

    let savedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "{}");

    if (savedFiles.transcript) {
      $("#transcript").val(savedFiles.transcript);
    }
    if (savedFiles.recommendation) {
      $("#recommendation").val(savedFiles.recommendation);
    }
    if (savedFiles.sop) {
      $("#sop").val(savedFiles.sop);
    }
    if (savedFiles.portfolio) {
      $("#portfolio").val(savedFiles.portfolio);
    }

    $("input[type='file']").change(function () {
      let fileName = $(this)[0].files[0]?.name || "";
      $(this).siblings(".file-name").val(fileName);
    });
  },

  uploadDocs: () => {
    $("#form-btn-p4").click(function () {
      let filesData = {};
      if ($("#transcript")[0].files.length) {
        filesData.transcript = $("#transcript")[0].files[0].name;
      }
      if ($("#recommendation")[0].files.length) {
        filesData.recommendation = $("#recommendation")[0].files[0].name;
      }
      if ($("#sop")[0].files.length) {
        filesData.sop = $("#sop")[0].files[0].name;
      }
      if ($("#portfolio")[0].files.length) {
        filesData.portfolio = $("#portfolio")[0].files[0].name;
      }

      localStorage.setItem("uploadedFiles", JSON.stringify(filesData));
      setTimeout(function () {
        window.location.href = "applicant-hub__p5.html";
      }, 300);
    });

    let savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      console.log("Previously saved files:", JSON.parse(savedFiles));
    }
  },

  fsubmit: () => {
    $("#submit-btn").click(function (event) {
      event.preventDefault();
      $(".submit-pop-up").css("visibility", "visible").css("opacity", "1");
    });

    $(".submit-pop-up a").click(function () {
      $(".submit-pop-up").css("visibility", "hidden").css("opacity", "0");
    });
  },
};

$(document).ready(function () {
  app.programSearchBox();
  app.register();
  app.login();
  app.selectProgram();
  app.personalInfo();
  app.paymentMethod();
  app.educationInfo();
  app.confirmAndSubmit();
  app.uploadDocs();
  app.fsubmit();
});
