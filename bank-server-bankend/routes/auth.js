const express = require("express");
const Employee = require("../models/Employee");
const axios = require("axios");
const AGENT_URL = process.env.AGENT_URL || "http://localhost:7001"; // Replace with your agent URL

const router = express.Router();

const api = axios.create({
  baseURL: AGENT_URL
});

// Middleware to check if the user is logged in

// Generate new OOB Invitation
router.get("/connect", async (req, res) => {
  try {
    const response = await api.post(`/out-of-band/create-invitation`, {
        alias: "Bank",
        handshake_protocols: ["https://didcomm.org/connections/1.0"],
        goal_code: "bank",
        goal: "Connect to Bank",
        auto_accept: true
    
        },
      );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error creating invitation", details: error });
  }
});

// Login using DID
router.post("/login", async (req, res) => {
  const { did } = req.body;
  const employee = await Employee.findOne({ did });

  if (!employee) return res.status(404).json({ error: "User not found" });

  // Request Employee VC Proof
  const proofRequest = {
    connection_id: employee.connection_id,
    presentation_request: {
      indy: {
        name: "Employee Verification",
        requested_attributes: {
          "0_employee_number": { name: "employee_number" }
        },
        requested_predicates: {},
        version: "1.0",
        nonce: "1234567890"
      }
    }
  };

  try {
    await axios.post("http://localhost:7001/present-proof-2.0/send-request", proofRequest);
    res.json({ message: "Proof request sent. Please verify in your wallet." });
  } catch (error) {
    res.status(500).json({ error: "Failed to send proof request" });
  }
});

module.exports = router;
