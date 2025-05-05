const Emergency = require("../models/Emergency");

const getAllEmergency = async (req, res) => {
  try {
    const emergencies = await Emergency.find().lean();
    if (!emergencies.length) {
      return res.status(404).json({ message: "No emergencies found" });
    }
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createNewEmergency = async (req, res) => {
  try {
    const { title, description, location, urgency, status } = req.body;

    if (!title || !description ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const emergency = await Emergency.create({
      title,
      description,
      location:location|| null,
      urgency: urgency || 'medium',
      status: status || 'open',
      createdAt: new Date()
    });

    res.status(201).json(emergency);
  } catch (err) {
    res.status(500).json({ message: "Failed to create emergency", error: err.message });
  }
};

const getEmergency = async (req, res) => {
  try {
    const { emergencyid } = req.params;
    const emergency = await Emergency.findById(emergencyid);
    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }
    res.json(emergency);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateEmergency = async (req, res) => {
  try {
    const { emergencyid } = req.params;
    const { title, description, location, urgency, status, volunteersResponded } = req.body;

    const emergency = await Emergency.findById(emergencyid);
    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    if (title) emergency.title = title;
    if (description) emergency.description = description;
    if (location) emergency.location = location;
    if (urgency) emergency.urgency = urgency;
    if (status) emergency.status = status;
    emergency.updatedAt = new Date();

    if (Array.isArray(volunteersResponded)) {
      emergency.volunteersResponded.push(...volunteersResponded);
    }

    const updated = await emergency.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update emergency", error: err.message });
  }
};

const deleteEmergency = async (req, res) => {
  try {
    const { emergencyid } = req.params;
    const emergency = await Emergency.findById(emergencyid);
    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    await emergency.deleteOne();
    res.json({ message: `Emergency '${emergency.title}' ID ${emergency._id} deleted` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete emergency", error: err.message });
  }
};

module.exports = {
  getAllEmergency,
  createNewEmergency,
  getEmergency,
  updateEmergency,
  deleteEmergency
};
