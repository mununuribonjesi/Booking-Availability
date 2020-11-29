const axios = require('axios');

function verifyToken(req,res, next)
{   
  if(!req.header['authorization']) return next(createError.Unauthorized())

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split('');
  const token = bearerToken[1]

    const response = axios.get('http://localhost:3000/api/verification',
    {
        headers:
        {
            'Authorization': `Bearer ${token}`
        }
    });
  
    return response
}