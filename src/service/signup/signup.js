document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("signup-form");
  
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const data = { username, password };
  
      try {
        const response = await fetch("/signup/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log("Success in signup.js");
        } else if (response.status === 404) {
          console.log("User does not exist..!");
        } else {
          console.log("Other error occurred.");
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
  