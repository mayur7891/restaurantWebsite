// // const {db}  = require('../index.js');
// const mysql = require('mysql2');
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Mayur123',
//     database: 'Restaurant',
//   });
  

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const signin = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const [rows] = await db.execute(`SELECT id, email, password FROM users WHERE email = ?`, [email]);
  
//       if (!Array.isArray(rows) || rows.length === 0) {
//         return res.status(404).json({ message: "User doesn't exist." });
//       }
  
//       const existingUser = rows[0];
  
//       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  
//       if (!isPasswordCorrect) {
//         return res.status(400).json({ message: "Invalid Password" });
//       }
  
//       const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'your-secret-key', { expiresIn: '1h' });
  
//       res.status(200).json({ existingUser, token });
//     } catch (error) {
//       console.error('Signin Error:', error);
//       res.status(500).json({ message: 'Something went wrong.' });
//     }
//   };
  

//   const signup = async (req, res) => {
//     const { Name, email, password, confirmPassword } = req.body;

//     // Check if email is defined
//     if (!email) {
//         return res.status(400).json({ message: "Email is required." });
//     }

//     try {
//         const [checkRows] = await db.execute(`SELECT id FROM users WHERE email = ?`, [email]);
//         console.log('checkRows:', checkRows);

//         if (checkRows.length > 0 && checkRows[0].length > 0) {
//             return res.status(400).json({ message: "User already exists." });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "Passwords don't match" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);

//         const [insertRows] = await db.execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, Name]);
//         const newUser = {
//             id: insertRows.insertId,
//             email,
//             name: Name,
//         };

//         const token = jwt.sign({ email: newUser.email, id: newUser.id }, 'test', { expiresIn: '1h' });

//         res.status(200).json({ newUser, token });
//     } catch (error) {
//         console.error('Signup Error:', error);
//         res.status(500).json({ message: 'Something went wrong.' });
//     }
// };


// module.exports = {
//   signin,
//   signup,
// };
