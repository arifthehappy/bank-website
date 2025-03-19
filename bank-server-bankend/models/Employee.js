const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  did: { type: String, unique: true, required: true },
  employee_number: { type: String, unique: true, required: true },
  designation: { type: String, required: true },
  branch_code: { type: String, required: true },
  connection_id: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
