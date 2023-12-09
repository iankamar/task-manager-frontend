const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.post("/todoist-proxy", async (req, res) => {
  const url = "https://api.todoist.com/rest/v1" + req.url;
  const response = await fetch(url, {
    method: req.method,
    headers: {
      Authorization: req.headers.authorization,
      "Content-Type": "application/json",
    },
    body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
