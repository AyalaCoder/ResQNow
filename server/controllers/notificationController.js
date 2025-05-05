const Notification = require("../models/Notification");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().lean();
    if (!notifications.length) {
      return res.status(404).json({ message: "No notifications found" });
    }
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const createNewNotification = async (req, res) => {
  try {
    const { userId, message, emergencyId } = req.body;

    if (!userId || !message || !emergencyId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const notification = await Notification.create({
      userId,
      message,
      emergencyId,
      isRead: false,
      createdAt: new Date()
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Failed to create notification", error: err.message });
  }
};


const getNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { message, isRead } = req.body;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (message !== undefined) notification.message = message;
    if (isRead !== undefined) notification.isRead = isRead;

    const updated = await notification.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification", error: err.message });
  }
};


const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.deleteOne();
    res.json({ message: `Notification ID ${notification._id} deleted` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notification", error: err.message });
  }
};

module.exports = {
  getAllNotifications,
  createNewNotification,
  getNotification,
  updateNotification,
  deleteNotification
};
