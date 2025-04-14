const PermissionSchema = new mongoose.Schema({
  delegation_id: { type: String, unique: true, required: true },
  employee_number: { type: String, required: true }, // delegated_to
  delegated_by: { type: String, required: true }, //delegation_id
  delegated_by_employee_number: { type: String, required: true }, // employee_number
  permissions_map: { type: Object, required: true },
  valid_from: { type: Date , required: true }, // unix timestamp
  valid_until: { type: Date, required: true }, // unix timestamp
  delegation_proof: { type: String, required: true }, // sha(delegation_id + employee_number + permission_map)
  nonce: { type: String, required: true },
  revoked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Permission", PermissionSchema);
