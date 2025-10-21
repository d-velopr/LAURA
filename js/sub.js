document
    .getElementById("subscribe-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      
      fetch(
        "https://script.google.com/macros/s/AKfycbx7VC5f4kU66yCBOcukPggIE1GRNXaUXR2zndg9vKlwsMChIR1V3ubG0Owc9mPA4QtpwA/exec",
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
          alert("Submission failed.");
        });
    });