const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
mongoDB(); //establishing Connection

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'http://localhost:3000');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
}) //when user goes to root address it makes a req , and we send res


//setting up Express application's middleware and routing
app.use(express.json());//Middleware functions have access to req , res objects
app.use('/api', require('./Routes/CreateUser'));
//This line mounts the router returned by require('./Routes/CreateUser') at the path /api
//This means that all routes defined in CreateUser.js will be prefixed with /api.
//if you have a route defined as /makeusers in CreateUser.js,
//it will be accessible at /api/makeusers in your application

app.use('/api', require('./Routes/DisplayData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})//when user hit the port this function will execute