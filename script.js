
document.getElementById("url-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Get the URL input value
    const url = document.getElementById("url-input").value;

    // Check if the input is empty
    if (!url) {
        // If no URL is provided, hide the QR code and return
        document.getElementById("qr-code").style.display = "none";
        return;
    }

    // Fetch the QR code from the server if URL is provided
    fetch(`/generate-qr?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            const qrCodeImg = document.getElementById("qr-code");
            qrCodeImg.src = `data:image/png;base64,${data.qr_code}`;
            qrCodeImg.style.display = "block"; 
        })
        .catch(error => {
            console.error("Error generating QR code:", error);
        });
});
