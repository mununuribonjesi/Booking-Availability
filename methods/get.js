"use strict"

const Stylist = require('../models/stylist');
const Skill = require('../models/skill');
const BarberSkill = require('../models/barberSkill');
const BarberAvailability = require('../models/availability');
const CustomerAppointment = require('../models/appointment');
const skill = require('../models/skill');
const workHours = require('../models/workHours');
const stylist = require('../models/stylist');
const Moment = require('moment');
const organisation = require('../models/Addresses');
const assert = require('assert');



async function customerAppointments(req, res) {

    var ca = await CustomerAppointment.find({ customerId: req.query.customerId }).exec();
    var customerApp = [];

    for (const el of ca) {

        var barber = await stylist.findOne({ _id: el.barberId }).exec();
        var skill = await Skill.findOne({ _id: el.skillId }).exec();
        var shop = await organisation.findOne({_id:barber.organisationId}).exec();
      
        customerApp.push({
            barber: barber.name, skill: skill.name, price: skill.price, startTime: el.startTime,
            endTime: el.endTime, date: el.date,addressLine1:shop.addressLine1,town:shop.town,
            county:shop.county,postCode:shop.postCode,companyName:shop.companyName
        })
    }

    console.log(customerApp);
    res.send({ customerApp }).status(200);
}

async function existingAppointment(req, res) {

    Stylist.findOne({ name: req.query.name }, function (err, stylist) {

        if (stylist) {

            console.log(stylist._id)
        }

        Skill.findOne({ _id: req.query.skill }, function (err, skill) {
            if (!skill) return res.status(400).send({ msg: 'We were unable to find this skill.' });

                CustomerAppointment.exists({ barberId:stylist._id ,startTime:Moment(req.query.date + 'T' + req.query.startTime)
                ,endTime:Moment(req.query.date + 'T' + req.query.endTime),date: Moment(req.query.date) }, function (err, cust) {

                    if(err)
                    {
                        console.log('does not already exists')
                        console.log(err);
                        res.status(500).send({ message: err });
                    }

                    if(!cust)
                    {

                        res.status(200).send({ message: cust });
                    }

                    if(cust)
                    {
                        res.status(500).send({message:'appointment exists'});
                    }
    
                })

        });
    });
}



async function company(req, res) {
    const { lat,long } = req.query
    var METERS_PER_MILE = 1609.34

 organisation.aggregate(
        [{$geoNear: {
            near: { type: "Point", coordinates: [Number(lat),Number(long)] },
                    distanceField: "distance",
                    maxDistance:METERS_PER_MILE*20,
                    distanceMultiplier:1/METERS_PER_MILE,
                    spherical: true
          }}],function (err, organisation) {

                    if (err) {
                        console.log(err);
                        return res.send({ message: 'cant get og' }).status(403);
                    }
                    else {
                        console.log(organisation);
                        return res.send({organisation:JSON.parse(bookings)}).status(200);
                    }
                })     
    }

async function Barbers(req, res) {
    Stylist.find({organisationId: req.query.organisationId}, function (err, stylists) {

        console.log(req.query.organisationId);
        if (err) {
            return res.send({ message: 'cant add barber skill' }).status(403);
        }
        else {
            console.log(stylists);
            return res.send({ stylists }).status(200);
        }
    })
}

async function skilledBarbers(req, res) {


    BarberSkill.find({ skillId: req.query.skillId }, function (err, barberSkills) {
        if (err) {
            return res.send({ message: 'cant get barber skill' }).status(403);
        }

        var barberIds = []

        Object.values(barberSkills).map((bs) => {
            barberIds.push(bs.barberId)
        })

        console.log(barberIds);

        Stylist.find({ _id: { $in: barberIds } }, function (err, stylists) {
            if (err) {
                return res.send({ message: 'cant add barber skill' }).status(403);
            }
            else {
                return res.send({ stylists }).status(200);
            }
        })
    })

}


async function timeSlots(req, res) {
    BarberAvailability.find({ barberId: req.query.barberId, isAvailable: true }, function (err, availability) {

        if (err) {
            return res.send({ message: 'time slot error' }).status(403);
        }
        else {
            return res.send({ availability }).status(200);
        }
    })
}

async function HoursOfWork(req, res) {

    workHours.find({ barberId: req.query.barberId, date: Moment(req.query.date) }, function (err, time) {

        if (err) {
            return res.send({ message: 'Hours of work error' }).status(403);
        }
        else {
            return res.send({ time }).status(200);
        }
    })
}


async function appointments(req, res) {

    CustomerAppointment.find({ barberId: req.query.barberId, date: Moment(req.query.date) }, function (err, bookings) {

        if (err) {
            return res.send({ message: 'appointments of work error' }).status(403);
        }
        else {
            return res.send({ bookings:JSON.parse(bookings) }).status(200);
        }
    })


}

async function skills(req, res) {

    Skill.find({organisationId:req.query.organisationId}, function (err, skills) {

        if (err) {
            return res.send({ message: 'cannot get skills' }).status(403);
        }
        else {
            return res.send({ skills }).status(200);
        }
    })
}


async function barberSkills(req, res) {
    BarberSkill.find({ barberId: req.query.barberId }, function (err, barberSkills) {
        if (err) {
            return res.send({ message: 'cant get barber skill' }).status(403);
        }

        var skillIds = []

        Object.values(barberSkills).map((bs) => {
            skillIds.push(bs.skillId)
        })

        console.log(skillIds);

        Skill.find({ _id: { $in: skillIds } }, function (err, skills) {
            if (err) {
                return res.send({ message: 'cant add barber skill' }).status(403);
            }
            else {
                return res.send({ skills }).status(200);
            }
        })
    })
}

module.exports = {
    Barbers,
    barberSkills,
    timeSlots,
    HoursOfWork,
    appointments,
    skills,
    skilledBarbers,
    customerAppointments,
    company,
    existingAppointment
}