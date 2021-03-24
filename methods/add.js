"use strict"

const Stylist = require('../models/stylist');
const Skill = require('../models/skill');
const BarberSkill = require('../models/barberSkill');
const BarberAvailability = require('../models/availability');
const CustomerAppointment = require('../models/appointment');
const WorkHours = require('../models/workHours')
const Moment = require('moment');

var moment = require('moment');
const Organisation = require('../models/Addresses');


async function Barber(req, res) {

    var stylist = new Stylist({
        name: req.body.name,
        organisationId: req.body.organisationId
    })

    stylist.save(function (err, stylist) {
        if (err) {
            return res.send({ message: 'cant add stylist' }).status(403);
        }
        else {
            return res.send({ message: stylist }).status(200);
        }
    })
}

async function deleteAppointment(req, res) {

    CustomerAppointment.findOne({ _id: req.body.id }, function (err, custApp) {

        if (!custApp) {
            return res.status(403).json({ message: 'cant find this appointment' });
        }

        BarberAvailability.findByIdAndUpdate(custApp.avalabilityId, { isAvailable: true }, function (err, barber) {
            if (err) {
                return res.status(403).json({ message: 'cant update this appointment' });
            }
        })

        CustomerAppointment.findByIdAndDelete(custApp._id, function (err) {

            if (err) {
                return res.status(403).json({ message: 'cant update this appointment' });
            }
            return res.status(403).json({ message: 'appointment has been successfully removed' });
        })
    })
}

async function registerOrganisation(req, res) {
    var og = new Organisation({
        companyName: req.body.companyName,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        town: req.body.town,
        county: req.body.county,
        postCode: req.body.postCode,
        uri:req.body.uri
    })

    og.save(function (err, company) {
        if (err) {
            return res.status(403).json({ message: 'Add Address failed' });
        }
        else {

            return res.status(200).json({ message: company });
        }
    });
}


async function createAppointment(req, res, payload) {

    Stylist.findOne({ name: req.body.name }, function (err, stylist) {

        if (stylist) {

            console.log(stylist._id)
        }

        Skill.findOne({ _id: req.body.skill }, function (err, skill) {
            if (!skill) return res.status(400).send({ msg: 'We were unable to find this skill.' });

            var customerAppointment = new CustomerAppointment
                ({
                    barberId: stylist._id,
                    startTime: Moment(req.body.date + 'T' + req.body.startTime),
                    endTime: Moment(req.body.date + 'T' + req.body.endTime),
                    date: Moment(req.body.date),
                    skillId: skill._id,
                    customerId: payload._id,
                })


            customerAppointment.save(function (err, customerAppointment) {
                if (err) {
                    return res.status(403).json({ message: 'added appointment' });
                }
                else {
                    return res.status(200).json({ message: customerAppointment });
                }

            });

        });
    });

}

async function HoursOfWork(req, res) {

    Stylist.findOne({ name: req.body.name }, function (err, stylist) {

        if (err) {

            return res.status(403).json({ message: 'cant find the barber' });
        }

        var workHours = new WorkHours({
            barberId: stylist._id,
            startTime: Moment(req.body.date + 'T' + req.body.startTime),
            endTime: Moment(req.body.date + 'T' + req.body.endTime),
            date: Moment(req.body.date),
        })

        workHours.save(function (err, customerAppointment) {
            if (err) {
                return res.status(403).json({message: 'could not add work hours' });
            }
            else {
                return res.status(200).json({message: 'added barber work hours' });
            }
        });
    })
}


async function BarberSkills(req, res) {

    Stylist.findOne({ name: req.body.stylistName }, function (err, stylist) {
        if (!stylist) return res.status(400).send({ msg: 'We were unable to find this stylist.' });

            var barberSkill = new BarberSkill({
                barberId: stylist._id,
                skillId: req.body.skillId
            })

            barberSkill.save(function (err, barberSkill) {
                if (err) {
                    return res.status(403).json({message: 'cant add barber skill' });
                }
                else {
                    return res.status(200).json({message:barberSkill });
                }
            })
    });
}

async function Skills(req, res) {

    var skill = new Skill({
        name: req.body.name,
        price: req.body.price,
        duration: req.body.duration,
        organisationId: req.body.organisationId
    })

    skill.save(function (err, skill) {
        if (err) {
            return res.status(403).json({message: 'cant add skill' });
        }
        else {
            return res.status(200).json({message:skill });
        }
    })
}

module.exports = {
    Barber,
    Skills,
    BarberSkills,
    createAppointment,
    deleteAppointment,
    HoursOfWork,
    registerOrganisation
}