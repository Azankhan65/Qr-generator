const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to generate QR code
app.get('/generate-qr', (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    // Generate the QR code from the URL
    QRCode.toDataURL(url, (err, qrCodeData) => {
        if (err) {
            return res.status(500).send('Error generating QR code');
        }
        res.json({ qr_code: qrCodeData.split(',')[1] }); // Send the base64 encoded image data
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
