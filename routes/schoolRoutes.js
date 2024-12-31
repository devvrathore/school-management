const express = require('express');
const router = express.Router();
const db = require('../db/db');
const authenticateToken = require('../middleware/jwt');


// router.get('/user', (req,res)=>{
//     res.send("hellow world");
    
// });

router.get('/user', (req, res) => {
    res.send("Hello world");
});

router.post('/login', require('../controller/authController').login);


router.get('/',  async(req,res)=>{
    try {
        const [rows, fields] = await db.query("SELECT * FROM school;");
        console.log("Query result:", rows);  
        return res.status(200).send(rows);
    } catch (error) {
        console.error("Error :", error);  
        return res.status(500).send('Error in fetching data');
    }
    
    
     
 })
 
 
 const student = []
 let roleno = 1
 
 router.post('/addStudent', async(req,res)=>{
    try {
     const studentdata = {
         roleno:roleno,
         name:req.body.name,
         userClass:req.body.userClass,
         password:req.body.password
     }
 
     const result = await db.query(
        "INSERT INTO school(roleno, name , class ,password) VALUES(?,?,?,?)",
        [studentdata.roleno,studentdata.name ,studentdata.userClass ,studentdata.password]
     )
 
     console.log("result:" ,result);
     roleno++;
      res.send(" Student data added successfully")
     
     
    } catch (error) {
 
     console.error(error);
         res.status(500).send("Error adding student data");
     
    }
    
    
 });

router.put('/updateStudent/:roleno',authenticateToken, async(req,res)=>{
   
    try {
        const schoolRole = parseInt(req.params.roleno);
    console.log("schooleRole" ,schoolRole);

    const { name, userClass, password } = req.body;
    console.log("Request Body:", req.body)


      const result = await db.query(
        "UPDATE school SET name=?, class=?, password=? WHERE roleno=?", 
        [name, userClass, password, schoolRole]
      );

      console.log(result);
      res.send("student data updated successfully")
      
    } catch (error) {
        console.log("error" , error);
        res.send("error in updating student data")
    }

});



router.delete('/deleteStudent/:roleno',authenticateToken, async(req,res)=>{
      
    try {
        const schoolRole = parseInt(req.params.roleno);
        console.log("schooleRole" ,schoolRole);
    
    
    
    
        const result = await db.query("DELETE FROM school WHERE roleno=?",[ schoolRole])
        if (result.affectedRows === 0 ){
            return res.status(400).send('student not found')
        }
    
        return res.send('Student data deleted successfully')
    } catch (error) {

        console.log("Error" ,error);
        res.send("error in deleting student data")
        
    }
});







module.exports = router