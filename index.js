const express = require("express");
const app = express();

const exec = require("child_process").exec;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Yo!");
});

app.get("/logs", (req, res) => {
  try {
    const vercelCertShellScript = exec("sh ./getVercelCert.sh");
    vercelCertShellScript?.stdout?.on("data", (data) => {
      return res.status(200).json({ error: null, logId: data.trim() });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error:: ${error}`, logId: "" });
  }
});

app.listen(process.env.PORT || 3000);
