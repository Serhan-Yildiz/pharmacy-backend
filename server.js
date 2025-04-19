const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Patient = require("./models/Patient");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.log(err));

app.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (error) {
    res.status(500).json({ error: "Kayıt başarısız" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu çalışıyor: ${PORT}`));
