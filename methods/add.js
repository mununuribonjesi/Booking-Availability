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
            return res.send({ message: 'cant find this appointment' }).status(403);
        }

        BarberAvailability.findByIdAndUpdate(custApp.avalabilityId, { isAvailable: true }, function (err, barber) {
            if (err) {
                return res.send({ message: 'cant update this appointment' }).status(403);
            }
        })

        CustomerAppointment.findByIdAndDelete(custApp._id, function (err) {

            if (err) {
                return res.send({ message: 'cant update this appointment' }).status(403);
            }
            return res.send({ message: 'appointment has been successfully removed' }).status(200);
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
            return res.send({ message: 'Add Address failed' }).status(403);
        }
        else {

            return res.send({ message: company }).status(200);
        }
    });
}


async function createAppointment(req, res, payload) {

    Stylist.findOne({ Name: req.body.name }, function (err, stylist) {

        if (stylist) {

            console.log(stylist._id)
        }

        Skill.findOne({ Name: req.body.skill }, function (err, skill) {
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
                    return res.send({ message: 'added appointment' }).status(403);
                }
                else {
                    return res.send({ message: customerAppointment }).status(200);
                }

            });

        });
    });

}

async function HoursOfWork(req, res) {

    Stylist.findOne({ name: req.body.name }, function (err, stylist) {

        if (err) {

            return res.send({ message: 'cant find the barber' }).status(403);
        }

        var workHours = new WorkHours({
            barberId: stylist._id,
            startTime: Moment(req.body.date + 'T' + req.body.startTime),
            endTime: Moment(req.body.date + 'T' + req.body.endTime),
            date: Moment(req.body.date),
        })

        workHours.save(function (err, customerAppointment) {
            if (err) {
                return res.send({ message: 'could not add work hours' }).status(403);
            }
            else {
                return res.send({ message: 'added barber work hours' }).status(200);
            }
        });
    })
}


async function BarberSkills(req, res) {

    Stylist.findOne({ Name: req.body.stylistName }, function (err, stylist) {
        if (!stylist) return res.status(400).send({ msg: 'We were unable to find this stylist.' });

        Skill.findOne({ Name: req.body.skillName }, function (err, skill) {
            if (!skill) return res.status(400).send({ msg: 'We were unable to find this skill.' });

            var barberSkill = new BarberSkill({
                barberId: stylist._id,
                skillId: skill._id
            })

            barberSkill.save(function (err, barberSkill) {
                if (err) {
                    return res.send({ message: 'cant add barber skill' }).status(403);
                }
                else {
                    return res.send({ message: barberSkill }).status(200);
                }
            })

        });
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
            return res.send({ message: 'cant add skill' }).status(403);
        }
        else {
            return res.send({ message: skill }).status(200);
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