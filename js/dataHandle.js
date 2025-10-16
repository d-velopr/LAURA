document.getElementById("mc-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting the default way
    
    const email = document.getElementById("mc-email").value; // Get the email input value
    const endpoint = "https://script.google.com/macros/s/AKfycbx7VC5f4kU66yCBOcukPggIE1GRNXaUXR2zndg9vKlwsMChIR1V3ubG0Owc9mPA4QtpwA/exec"; // Replace with your Google Apps Script URL
    
    // Make a POST request to Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbx7VC5f4kU66yCBOcukPggIE1GRNXaUXR2zndg9vKlwsMChIR1V3ubG0Owc9mPA4QtpwA/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `dEmail=${encodeURIComponent(email)}`
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === "success") {
            document.querySelector(".subscribe-message").textContent = "Subscribed successfully!";
            document.getElementById("mc-form").reset();
          } else {
            document.querySelector(".subscribe-message").textContent = response.message || "Something went wrong.";
          }
        })
        .catch((err) => {
          document.querySelector(".subscribe-message").textContent = "Something went wrong.";
          console.error("Error:", err);
        });
      
});  