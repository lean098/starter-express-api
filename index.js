const express = require("express");
const app = express();

const exec = require("child_process").exec;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Yo!");
});

app.get("/logs", (req, res) => {
  try {
    const openssl = exec(
      "openssl s_client -servername vercel.app -connect vercel.app:443 | openssl x509 -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64"
    );
    openssl?.stdout?.on("data", (data) => {
      res.status(200).json({ error: null, logId: data.trim() });
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
