document.addEventListener("DOMContentLoaded", function() {
  var signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var signupData = {
      email: email,
      password: password,
      date: new Date().toISOString()
    };

    fetch("/loginpage/credentials.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupData)
    })
      .then(response => {
        if (response.ok) {
          alert("Sign up successful! Please login.");
          window.location.href = "loginpage.html";
        } else {
          throw new Error("Sign up failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error during sign up: ", error);
        alert("An error occurred while processing your request. Please try again later.");
      });
  });
});
