const express = require("express");
const app = express();

const { exec } = require("child_process");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Yo!");
});

app.get("/logs", (req, res) => {
  try {
    const openssl = exec("sh ./getVercelCert.sh");

    openssl?.stdout?.on("data", (data) => {
      res.status(200).json({ error: null, logId: data.trim() });
    });

    openssl?.stdout?.on("error", (error) => {
      res.status(500).json({ error, logId: "" });
    });

    openssl.stdin.end();

    setTimeout(() => openssl.kill(), 300);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error:: ${error}`, logId: "" });
  }
});

app.listen(process.env.PORT || 3000);
