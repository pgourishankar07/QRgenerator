import express from "express";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Serve the form page
app.get("/", (req, res) => {
  res.render("index", { qrImageUrl: null });
});

// Handle form submission
app.post("/", (req, res) => {
  const url = req.body.item;
  const qrCodeName = "qrCode"; // Default name or you can customize it
  const filePath = `public/${qrCodeName}_qrImg.png`;

  // Generate QR code
  const qr_svg = qr.image(url, { type: "png" });
  qr_svg.pipe(fs.createWriteStream(filePath));

  // Send the file path to the EJS template
  const qrImageUrl = `/${qrCodeName}_qrImg.png`;
  res.render("index", { qrImageUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
