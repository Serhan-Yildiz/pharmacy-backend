const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// DATA_FILE'ı absolute path olarak tanımla
const DATA_FILE = path.join(__dirname, "data", "patients.json");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

function readPatients() {
  try {
      if (!fs.existsSync(DATA_FILE)) {
          fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
          fs.writeFileSync(DATA_FILE, "[]");
      }
      const data = fs.readFileSync(DATA_FILE);
      return JSON.parse(data);
  } catch (error) {
      console.error("Dosya okuma hatası:", error);
      throw new Error("Hasta verileri okunamadı.");
  }
}

function writePatients(patients) {
  try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(patients, null, 2));
  } catch (error) {
      console.error("Dosya yazma hatası:", error);
      throw new Error("Hasta verileri kaydedilemedi.");
  }
}
const isValidTc = tc => /^\d{11}$/.test(tc);  // 11 haneli sayı kontrolü

app.post("/register", (req, res) => {
    const newPatient = req.body;

    if (!isValidTc(newPatient.tc)) {
        return res.status(400).json({ error: "Geçersiz TC numarası" });
    }

    // Diğer kontrol ve işlem
});

app.post("/login", (req, res) => {
    const { tc, name, surname } = req.body;

    if (!isValidTc(tc)) {
        return res.status(400).json({ error: "Geçersiz TC numarası" });
    }

    // Diğer kontrol ve işlem
});

// Sunucu başlat
app.listen(PORT, () => {
    console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
});
