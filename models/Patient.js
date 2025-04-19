const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  tc: String,
  name: String,
  surname: String,
  age: Number,
  height: Number,
  weight: Number,
  gender: String,
  planningPregnancy: String,
  pregnant: String,
  smoking: String,
  alcohol: String,
  caffeine: String,
  grapefruit: String,
  allergies: [String],
  pastIllnesses: [String],
  chronicIllnesses: String,
  herbalTeas: String,
  supplements: String,
  geneticDiseases: String,
  currentMedications: String
});

module.exports = mongoose.model("Patient", patientSchema);
