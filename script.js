document
  .getElementById("logoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const placeName = document
      .getElementById("placeName")
      .value.trim()
      .toUpperCase();
    const selectedTemplate = document.querySelector(
      'input[name="template"]:checked'
    ).value;

    // Create a new Image element to load the template
    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous"; // Handle CORS

    // Define your mapping of templates to images
    const templateImageMap = {
      template1: "logo1.png",
      template2: "logo2.png",
      template3: "logo3.png",
    };

    // Use the selected template to find the corresponding logo image
    const logoImageSrc = templateImageMap[selectedTemplate];

    console.log(`Loading image: ${logoImageSrc}`);

    templateImg.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match template image
      canvas.width = templateImg.width;
      canvas.height = templateImg.height;

      // Draw template image on canvas
      ctx.drawImage(templateImg, 0, 0);

      // Draw text below the logo
      ctx.fillStyle = "#000000"; // Black
      ctx.font = "bold 120px Arial"; // Adjust font family and size as needed
      ctx.textAlign = "center";
      ctx.fillText(placeName, canvas.width / 2 + 270, canvas.height - 300); // Adjust Y position as needed

      // Update preview image
      const previewImg = document.getElementById("previewLogo");
      previewImg.src = canvas.toDataURL();

      // Show download button
      const downloadBtn = document.getElementById("downloadButton");
      downloadBtn.style.display = "inline-block";
      downloadBtn.href = canvas.toDataURL();
      downloadBtn.download = "ml-community-logo.png";
    };

    templateImg.onerror = function () {
      console.error("Error loading the image."); // Log the error
      alert("Error loading the selected template. Please try again.");
    };

    // Set source URL for the selected logo image
    templateImg.src = logoImageSrc; // Load the corresponding logo image
  });
