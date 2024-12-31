const db = require('../db/db');
const model = require('../routes/schoolRoutes');
const autheticateToken = require('../middleware/jwt');

const jwt = require("jsonwebtoken");
const SECRET_KEY = "SCHOOL1234";

const login = async (req, res) => {
    const { name, password } = req.body;
    console.log("Received login request with name:", name);

    try {
       
        const [rows] = await db.query("SELECT * FROM school WHERE  name = (?)", [name]);
        console.log("Query result:", rows)


        if (rows.length === 0) {
            return res.status(401).json({ error: "Student name is invalid" });
        }

        const user = rows[0]; 

        
        if (user.password !== password) {
            return res.status(401).json({ error: "Password is invalid" });
        }

       
        const token = jwt.sign({ userId: user.roleno, userName: user.name }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ 
            message: "Login successful",
            token: token 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
    


const authController = {
    login
}

module.exports = authController