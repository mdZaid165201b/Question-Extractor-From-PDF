const fs = require("fs");
const pdfParse = require("pdf-parse");

let countQuestions = 0;

let extractQuestions = (fileName) => {
  try {
    if (fs.existsSync(fileName)) {
      let BufferData = fs.readFileSync(fileName);
      let content = "";
      pdfParse(BufferData).then((data) => {
        content = data.text;
        let questions = content.split("\n");
        questions.forEach((elem) => {
          if (elem.includes("Question")) {
            ++countQuestions;
            fs.appendFile(
              `${fileName.split(".")[0]} Questions.txt`,
              `${elem}\n`,
              (error) => {
                if (error) {
                  console.log(error);
                  return;
                }
              }
            );
          }
        });
        console.log("Successfully Extracted!!!");
        console.log(countQuestions);
      });
    } else {
      throw new Error("File Does not exist!!!");
    }
  } catch (err) {
    console.log(err);
  }
};

extractQuestions("9th Book.pdf")
