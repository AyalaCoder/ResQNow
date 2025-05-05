const CallHistory = require("../models/CallHistory");

const getAllCallHistories = async (req, res) => {
  try {
    const callHistories = await CallHistory.find().populate('emergency user').lean();
    if (!callHistories.length) {
      return res.status(404).send("There are no call histories.");
    }
    res.json(callHistories);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};


const getCallHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const callHistory = await CallHistory.findById(id).populate('emergency user').lean();
    if (!callHistory) {
      return res.status(404).send("Call history not found.");
    }
    res.json(callHistory);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};

const createNewCallHistory = async (req, res) => {
  const { emergency, user, action } = req.body;

  if (!emergency || !user || !action) {
    return res.status(400).send("Emergency, user, and action are required.");
  }

  try {
    const newCallHistory = new CallHistory({
      emergency,
      user,
      action
    });

    await newCallHistory.save();
    res.json(newCallHistory);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};


const updateCallHistory = async (req, res) => {
  const { id } = req.params;
  const { emergency, user, action } = req.body;

  try {
    const callHistory = await CallHistory.findById(id);
    if (!callHistory) {
      return res.status(404).send("Call history not found.");
    }

    if (emergency) callHistory.emergency = emergency;
    if (user) callHistory.user = user;
    if (action) callHistory.action = action;

    await callHistory.save();
    res.json(callHistory);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};


const deleteCallHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const callHistory = await CallHistory.findById(id);
    if (!callHistory) {
      return res.status(404).send("Call history not found.");
    }

    await callHistory.deleteOne();
    res.send(`Call history with ID ${id} deleted.`);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};

module.exports = {
  getAllCallHistories,
  getCallHistoryById,
  createNewCallHistory,
  updateCallHistory,
  deleteCallHistory
};
