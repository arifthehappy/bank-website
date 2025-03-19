const PermissionSchema = new mongoose.Schema({
  employee_number: { type: String, required: true },
  delegated_by: { type: String, required: true },
  permissions_map: { type: Object, required: true },
  valid_from: { type: Date, required: true },
  valid_until: { type: Date, required: true },
  delegation_proof: { type: String, required: true },
  nonce: { type: String, required: true },
  revoked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Permission", PermissionSchema);
