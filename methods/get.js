const Stylist = require('../models/stylist');
const Skill = require('../models/skill');
const BarberSkill = require('../models/barberSkill');
const BarberAvailability = require('../models/availability');
const CustomerAppointment = require('../models/appointment');
const skill = require('../models/skill');
const workHours = require('../models/workHours');



async function Barbers(req, res) {
    Stylist.find({}, function(err, stylists){
        if (err) {
            return res.send({ message: 'cant add barber skill' }).status(403);
        }
        else {
            return res.send({stylists}).status(200);
        }
    })
}



async function timeSlots(req, res) {
    BarberAvailability.find({barberId:req.query.barberId,isAvailable:true}, function(err, availability){

            if (err) {
                return res.send({ message: 'time slot error' }).status(403);
            }
            else{
                return res.send({availability}).status(200);
            }       
    })
}

async function HoursOfWork(req,res){

    workHours.find({barberId:req.query.barberId}, function(err, time){

        if (err) {
            return res.send({ message: 'Hours of work error' }).status(403);
        }
        else{
            return res.send({time}).status(200);
        }       
})
}


async function appointments(req,res)
{

    CustomerAppointment.find({barberId:req.query.barberId}, function(err, bookings){

        if (err) {
            return res.send({ message: 'appointments of work error' }).status(403);
        }
        else{
            return res.send({bookings}).status(200);
        }       
})


}


async function barberSkills(req, res) {
    BarberSkill.find({barberId:req.query.barberId}, function(err, barberSkills){
        if (err) {
            return res.send({ message: 'cant add barber skill' }).status(403);
        }

        var skillIds = []

       Object.values(barberSkills).map((bs) => {
           skillIds.push(bs.skillId)
       })

       console.log(skillIds);
       
        Skill.find({_id:{ $in: skillIds}}, function(err, skills){
            if (err) {
                return res.send({ message: 'cant add barber skill' }).status(403);
            }
            else{
                return res.send({skills}).status(200);
            }
            })
       
    })
}



module.exports = {
    Barbers,
    barberSkills,
    timeSlots,
    HoursOfWork,
    appointments
}