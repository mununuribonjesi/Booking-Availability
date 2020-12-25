const Stylist = require('../models/stylist');
const Skill = require('../models/skill');
const BarberSkill = require('../models/barberSkill');
const BarberAvailability = require('../models/availability');
const CustomerAppointment = require('../models/appointment');
const WorkHours = require('../models/workHours')
const Moment = require('moment');

var moment = require('moment');


async function Barber(req, res) {
    console.log(req.tableNo)

    stylist = new Stylist({
        Name: req.body.Name
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

async function editAppointment(req,res,payload)
{

    
    CustomerAppointment.findOne({_id:req.body.id}, function (err, custApp) {

        if (!custApp) {
            return res.send({ message: 'cant find this appointment' }).status(403);
        }

        BarberAvailability.findByIdAndUpdate(custApp.avalabilityId,{isAvailable:true}, function (err, barber) {
            if (err) {
                return res.send({ message: 'cant update this appointment' }).status(403);
            }
        
        })


            Skill.findOne({ Name: req.body.skillName }, function (err, skill) {
                if (!skill) return res.status(400).send({ msg: 'We were unable to find this skill.'})

                Stylist.findOne({ Name: req.body.stylistName }, function (err, stylist) {

                    if (stylist)
                    {
            
                        console.log(stylist._id)
                    }


            BarberAvailability.findOne({ barberId:stylist._id, startTime: req.body.startTime, endTime: req.body.endTime, date: req.body.date }, function (err, barber) {
        
                if(barber)
                {
                if (!barber.isAvailable) {
        
                    console.log(barber.isAvailable)
                    return res.status(400).send({ msg: 'We were unable to find an appointment for this date.' });
             
                }
                else 
                {

                    barber.isAvailable = false;
                    barber.save(function (err,availability) {
                        if (err) { return res.status(500).send({ msg: err.message }); }
        
                        CustomerAppointment.findByIdAndUpdate(req.body.id,{barberId: stylist._id,avalabilityId: availability._id,skillId: skill._id,customerId: payload._id})
        
                    });
                }
            }
        
            else 
            {
                return res.status(400).send({ msg: 'We were unable to find an appointment for this date.' });
            }
        
            });

        })   
    })    

    })
        
}


async function deleteAppointment(req,res)
{

    CustomerAppointment.findOne({_id:req.body.id}, function (err, custApp) {

        if (!custApp) {
            return res.send({ message: 'cant find this appointment' }).status(403);
        }

        console.log(custApp.avalabilityId)

        BarberAvailability.findByIdAndUpdate(custApp.avalabilityId,{isAvailable:true}, function (err, barber) {
            if (err) {
                return res.send({ message: 'cant update this appointment' }).status(403);
            }
        
        })




        CustomerAppointment.findByIdAndDelete(custApp._id,function (err) {

            if (err) {
                return res.send({ message: 'cant update this appointment' }).status(403);
            }

     

                return res.send({ message: 'appointment has been successfully removed' }).status(200);

        })

    })

}


async function createAppointment(req, res,payload) {

    Stylist.findOne({ Name: req.body.name }, function (err, stylist) {

        if (stylist)
        {

            console.log(stylist._id)
        }
        


    Skill.findOne({ Name: req.body.skill }, function (err, skill) {
         if (!skill) return res.status(400).send({ msg: 'We were unable to find this skill.' });


            customerAppointment = new CustomerAppointment
            ({
                barberId: stylist._id,
                startTime:Moment(req.body.date+'T'+req.body.startTime),
                endTime:Moment(req.body.date+'T'+req.body.endTime),
                date:Moment(req.body.date),
                skillId: skill._id,
                customerId: payload._id,
            })

    
            customerAppointment.save(function (err,customerAppointment) {
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

async function HoursOfWork(req,res)
{

    Stylist.findOne({ Name: req.body.name }, function (err, stylist) {

        if (err)
        {

            return res.send({ message: 'cant find the barber' }).status(403);
        }

    workHours = new WorkHours({
        barberId: stylist._id,
        startTime:Moment(req.body.date+'T'+req.body.startTime),
        endTime:Moment(req.body.date+'T'+req.body.endTime),
        date:Moment(req.body.date),
    })


    workHours.save(function (err,customerAppointment) {
        if (err) {
            return res.send({ message: 'could not add work hours' }).status(403);
        }
        else {
            return res.send({ message: 'added barber work hours' }).status(200);
        }
        
    });


    })
}


async function StylistAvailability(req, res) {

    var a = moment('2020-11-30');
    var b = moment('2020-12-30');
    var value = {
        interval: '00:30:00',
        startTime: '09:00:00',
        endTime: '20:00:00'
    };

    var inputDataFormat = "HH:mm:ss";
    var outputFormat = "HH:mm";

    var tmp = moment(value.interval, inputDataFormat);
    var dif = tmp - moment().startOf("day");

    var startIntervalTime = moment(value.startTime, inputDataFormat).add(-dif, "ms");
    var endIntervalTime = moment(value.startTime, inputDataFormat);
    var finishTime = moment(value.endTime, inputDataFormat);

    Stylist.findOne({ Name: req.body.stylistName }, function (err, stylist) {
        if (!stylist) return res.status(400).send({ msg: 'We were unable to find this stylist.' });

        var obj = [];

        for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {


            while (startIntervalTime < finishTime) {
                obj.push({
                    barberId: stylist._id,
                    startTime: startIntervalTime.format(outputFormat),
                    endTime: endIntervalTime.format(outputFormat),
                    date: m.format('YYYY-MM-DD'),
                    isAvailable: true
                });
                startIntervalTime.add(dif, "ms");
                endIntervalTime.add(dif, "ms");
            }

            var startIntervalTime = moment(value.startTime, inputDataFormat).add(-dif, "ms");
            var endIntervalTime = moment(value.startTime, inputDataFormat);

        }


           var count = 0;
           var recordsAdded = 0;
  
           for (let object of obj)
           {
                BarberAvailability.findOne({ barberId: object.barberId, startTime: object.startTime, endTime: object.endTime, date: object.date }, function (err, barber) {
                    if (barber) {


                   
            }

            else 
            {

                BarberAvailability.insertMany({
                    barberId: object.barberId,
                    startTime: object.startTime,
                    endTime: object.endTime,
                    date: object.date,
                    isAvailable: object.isAvailable
                }).then(function () {
            
                }).catch(function (error) {
                    console.log(error);         
            })
            }
            });

            count++;

            if(count === obj.length)
            {
                return res.send({ message: 'add availibity done ' + recordsAdded + ' of ' + obj.length + ' added ' }).status(200);
            }
        }
    });
}




async function BarberSkills(req, res) {

    Stylist.findOne({ Name: req.body.stylistName }, function (err, stylist) {
        if (!stylist) return res.status(400).send({ msg: 'We were unable to find this stylist.' });

        Skill.findOne({ Name: req.body.skillName }, function (err, skill) {
            if (!skill) return res.status(400).send({ msg: 'We were unable to find this skill.' });

            barberSkill = new BarberSkill({
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

    skill = new Skill({
        Name: req.body.Name,
        Price: req.body.Price,
        Duration: req.body.Duration
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
    StylistAvailability,
    createAppointment,
    deleteAppointment,
    editAppointment,
    HoursOfWork
}