"use strict"

const CustomerAppointment = require('../models/appointment');
const Stylist = require('../models/stylist');
const Skill = require('../models/skill');
const Moment = require('moment');

async function appointment(req, res) {

    Stylist.findOne({ name: req.body.name }, function (err, stylist) {

        if (stylist) {

        }

        CustomerAppointment.findOneAndDelete({
            barberId: stylist._id, startTime: Moment(req.body.date + 'T' + req.body.startTime),
            endTime: Moment(req.body.date + 'T' + req.body.endTime)
        }, function (err, app) {

            if (err) {
                return res.status(403).json({ error: 'unable to send delete appointment' });
            }

            if (!app) {
                return res.status(403).json({ error: 'not appointment to delete' });
            }

            return res.status(200).json({ message: 'appointment deleted' })

        })

    });

}

module.exports = {
    appointment
}



