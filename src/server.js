const express = require('express')
const bot = require('./bot')
const dotenv = require("dotenv");

const app = express()
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;

app.post("/bot", async (req, res) => {
    try {
    const result = await bot();
    res.status(200).json({ message: "Bot executado com sucesso", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(PORT, () => console.log(`server running in the port ${PORT}`));