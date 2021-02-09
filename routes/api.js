"use strict"

const express = require('express');
const router = express.Router();
const add = require('../methods/add');
const get = require('../methods/get');
const remove = require('../methods/delete');
const security = require('../methods/Authorization')

router.post('/barber', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    add.Barber(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.get('/findappointments', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.existingAppointment(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.get('/customerAppointments', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.customerAppointments(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.post('/workHours', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    add.HoursOfWork(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.get('/workHours', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.HoursOfWork(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.get('/skilledBarbers', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.skilledBarbers(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.get('/skills', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.skills(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }
});

router.get('/appointments', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.appointments(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.get('/timeSlots', async function (req, res, next) {
 
  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.timeSlots(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.get('/barberSkills', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.barberSkills(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.get('/barbers', async function (req, res, next) {


  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    get.Barbers(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.post('/skill', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    add.Skills(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.post('/barberSkill', async function (req, res, next) {


  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    add.BarberSkills(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.post('/availability', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    add.StylistAvailability(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.post('/appointment', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    add.createAppointment(req,res,Auth.data.payload);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.post('/organisation', async function (req, res, next) {

  //if(!req.headers['authorization']) return res.sendStatus(403);

  //const Auth = await security.Authorization(req);

 
    add.registerOrganisation(req,res);


});


router.get('/organisation', async function (req, res, next) {

  //if(!req.headers['authorization']) return res.sendStatus(403);
  //const Auth = await security.Authorization(req);


    get.company(req,res);


});


router.post('/appointment/delete', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    remove.appointment(req,res)
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.delete('/appointment', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const Auth = await security.Authorization(req);

  if(Auth.status==200)
  {
    remove.appointment(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

  
  

module.exports = router