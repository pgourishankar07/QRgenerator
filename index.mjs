import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    { message: "Type URL : ", name: "URL" },
    {
      message: "Type QRCodeName (google,fb,youtube,etc) : ",
      name: "qrCodeName",
    },
  ])
  .then((answers) => {
    let url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(`${answers.qrCodeName}_qrImg.png`));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something went wrong");
    }
  });
