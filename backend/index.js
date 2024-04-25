const express = require("express");
const multer = require("multer");
const pdfjs = require("pdfjs-dist/es5/build/pdf");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const content = await getItems(fileBuffer);
    res.json({ content });
  } catch (error) {
    console.error("Error processing PDF:", error); // Log the error for debugging
    res.status(500).send("Error processing PDF.");
  }
});

async function getContent(src) {
  const doc = await pdfjs.getDocument({ data: src }).promise;
  const page = await doc.getPage(1);
  return await page.getTextContent();
}

async function getItems(src) {
  const content = await getContent(src);
  if (!content || !content.items) {
    throw new Error("Invalid content received from PDF.");
  }
  const items = content.items.map((item) => item.str);
  return items;
}

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
