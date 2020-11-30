const express = require('express');
const router = express.Router();
const add = require('../methods/add');
const get = require('../methods/get');
const axios = require('axios');



router.post('/barber', async function (req, res, next) {

  //to do create function to return a response for reusability purposes

  if(!req.headers['authorization']) return res.sendStatus(403);

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
  {
    add.Barber(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.get('/timeSlots', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
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

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
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

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
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

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
  {
    add.skills(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});

router.post('/barberSkill', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
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

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  console.log(response.data);

  if(response.status==200)
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

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
  {
    add.createAppointment(req,res,response.data.payload);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.post('/appointment/delete', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
  {
    add.deleteAppointment(req,res);
  }
  else
  {
    return res.sendStatus(403)
  }

});


router.post('/appointment/edit', async function (req, res, next) {

  if(!req.headers['authorization']) return res.sendStatus(403);

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const url = "http://localhost:3000/api/verification"

  const response = await axios({
    url:url,
    method: 'Post',
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })

  if(response.status==200)
  {
    add.editAppointment(req,res,response.data.payload);
  }
  else
  {
    return res.sendStatus(403)
  }

});
  
  

module.exports = router