document.addEventListener("DOMContentLoaded", function() {
  var loginForm = document.getElementById("login-form");
  var failedLoginAttempts = 0;
  var maxLoginAttempts = 5;

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("credentials.json")
      .then(response => response.json())
      .then(data => {
        var matchedCredential = data.find(
          cred => cred.email === email && cred.password === password
        );
        if (matchedCredential) {
          alert("Login successful! Hello " + matchedCredential.first_name + " " + matchedCredential.last_name + "!");
          window.location.href = "/DF_Home_Page/df_home_page.html";
        } else {
          failedLoginAttempts += 1;
          var loginAttemptsLeft = maxLoginAttempts - failedLoginAttempts;
          alert("Invalid email or password. You have " + loginAttemptsLeft + " attempts left!");

          if (failedLoginAttempts === maxLoginAttempts) {
            alert("You have exceeded the maximum number of login attempts.");
            window.location.href = "http://127.0.0.1:5500/HTML/index.html";
          }
        }
      })
      .catch(error => {
        console.error("Error reading credentials: ", error);
        alert("An error occurred while processing your request. Please try again later.");
      });
  });
});
