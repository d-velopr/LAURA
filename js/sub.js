document
    .getElementById("subscribe-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      
      fetch(
        "https://script.google.com/macros/s/AKfycbwRMB7SUnwC1-pJH-Tnq5OoHWkZJgRSGJNty8sR6hoyaUp4dZP-gRZjvqyr4QCyoQOV1A/exec",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert("Form Submitted Successfully!");
          document.getElementById("subscribe-form").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Form Submitted Successfully!");
        });
    });