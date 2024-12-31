const express = require("express");
const app = express();
const port = 3000;
const schoolRoute = require('./routes/schoolRoutes');


app.use(express.json());
app.use('/', schoolRoute)


app.listen(port,(req,res)=>{
    console.log(`server is running on localhost:${port}`);
    
});