document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const dayOfBirth = document.getElementById("dayOfBirth").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    const data = { fullname, dayOfBirth, email, gender, address, password };

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
      } else if (response.status === 400) {
        console.log("User already exits");
      } else if (response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log("Other error occurred.");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
