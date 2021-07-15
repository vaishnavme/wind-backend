const { Notification } = require("../models/notification.model");

const populateData = {
    path: "sourceUser",
    select: "name username profilePhoto"
}

const getUserNotification = async(req, res) => {
    const { user } = req;
    try {
        const notification = await Notification.find({targetUser: user.userId}).populate(populateData);

        const allNotifications = notification.sort((notify1, notify2) => notify2.time - notify1.time)
        res.json({
            success: true,
            allNotifications
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = getUserNotification;