const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = "./patients.json";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// JSON dosyasını oku
function readPatients() {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// JSON dosyasına yaz
function writePatients(patients) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(patients, null, 2));
}

// Kayıt endpointi
app.post("/register", (req, res) => {
    const newPatient = req.body;
    const patients = readPatients();

    if (patients.find(p => p.tc === newPatient.tc)) {
        return res.status(400).json({ error: "Bu TC ile zaten kayıtlı bir kullanıcı var" });
    }

    patients.push(newPatient);
    writePatients(patients);

    res.status(201).json({ message: "Kayıt başarılı" });
});

// Giriş endpointi (TC, Ad, Soyad ile)
app.post("/login", (req, res) => {
    const { tc, name, surname } = req.body;
    const patients = readPatients();

    const user = patients.find(
        p => p.tc === tc && p.name.toLowerCase() === name.toLowerCase() && p.surname.toLowerCase() === surname.toLowerCase()
    );

    if (!user) {
        return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    res.json({ message: "Giriş başarılı", patient: user });
});

// Sunucu başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
