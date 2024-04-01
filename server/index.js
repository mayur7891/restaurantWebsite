const mysql = require('mysql2/promise'); 
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const cron = require('node-cron');
const port = 5000;
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const dataSql = 'SELECT * FROM Menu';
const categorySql = 'SELECT DISTINCT category FROM Menu';

// API endpoints

// Get data
app.get('/api/data', async (req, res) => {
  try {
    const [results] = await db.query(dataSql);
    res.json(results);
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const [results] = await db.query(categorySql);
    const categories = results.map((row) => row.category);
    res.json(categories);
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// User registration (signup)
app.post('/signup', async (req, res) => {
  try {
    const checkUserSql = 'SELECT id FROM users WHERE email = ?';
    const { email, password, username } = req.body;

    const [result] = await db.query(checkUserSql, [email]);

    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const signUpSql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
    const values = [email, hash, username];

    await db.query(signUpSql, values);

 
    const getUserIdSql = 'SELECT id FROM users WHERE email = ?';
    const [userResult] = await db.query(getUserIdSql, [email]);

    if (userResult.length === 1) {
      const userId = userResult[0].id;
      return res.status(200).json({ message: 'User registered successfully', userId });
    } else {
      return res.status(500).json({ message: 'User registration successful, but unable to fetch user ID' });
    }
  } catch (err) {
    console.error('Error during user registration: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// User login (signin)
// Signin (user login)
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received login request for email:', email);

    // Query the database to get user information
    const getUserSql = 'SELECT id, email, password FROM users WHERE email = ?';

    const [results] = await db.query(getUserSql, [email]);

    if (results.length === 0) {
      console.log('Login failed: User not found');
      return res.json('Fail');
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      console.log('Login successful');
      
      return res.json({ message: 'Success', userId: user.id });
    } else {
      console.log('Login failed: Invalid password');
      return res.json('Fail');
    }
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// API endpoint for booking a table
// app.post('/book', (req, res) => {
//   const { name, email, dateTime, specialRequest } = req.body;
  
//   // You can add validation for the input data here if needed
  
//   // Insert the booking data into the database
//   const bookTableSql = 'INSERT INTO Bookings (name, email, dateTime, specialRequest) VALUES (?, ?, ?, ?)';
//   const values = [name, email, dateTime, specialRequest];
  
//   db.query(bookTableSql, values, (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
    
//     return res.status(200).json({ message: 'Table booked successfully' });
//   });
// });


//Booking Logic


async function createEntriesForDay(date) {
  for (let tableID = 1; tableID <= 20; tableID++) {
    const slotData = {
      date: date.toISOString().slice(0, 10),
      slots: [],
    };

    // Create slots for the entire day (0:00 to 23:59) with availability set to "available"
    for (let hour = 0; hour < 24; hour += 3) {
      const startTime = `${hour}:00`;
      const endTime = `${hour + 3}:00`;
      slotData.slots.push({
        time: `${startTime} - ${endTime}`,
        availability: 'available',
      });
    }

    // Insert the slot data into the database for the given table and date
    const insertSql = 'INSERT INTO restaurant_tables (tableID, slot) VALUES (?, ?)';
    const values = [tableID, JSON.stringify(slotData)];

    await db.query(insertSql, values);
  }
}

// Function to delete old entries for dates earlier than a specified date
async function deleteOldEntries(date) {
  const deleteSql = 'DELETE FROM restaurant_tables WHERE DATE(slot->"$.date") < ?';
  const values = [date.toISOString().slice(0, 10)];

  await db.query(deleteSql, values);
}

// Schedule the task to run daily at 00:00 AM
cron.schedule('0 0 * * *', async () => {
  // Calculate the date for today
  const today = new Date();

  // Calculate the date for 7 days from today
  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7);

  console.log('Scheduled task executed at 00:00 AM.');

  // Create entries for today if they don't exist
  await createEntriesForDay(next7Days);

  // Delete old entries for dates earlier than today
  await deleteOldEntries(today);

  console.log('Entries created and old entries deleted.');
});


// Function to create entries for the next 7 days
// Function to create entries for the next 7 days
// async function createEntriesForNext7Days() {
//   const today = new Date();

//   for (let i = 6; i < 7; i++) {
//     const currentDate = new Date(today);
//     currentDate.setDate(today.getDate() + i);
//     await createEntriesForDay(currentDate);
//     console.log(`Entries created for ${currentDate.toISOString().slice(0, 10)}`);
//   }
// }

// // Call the function to create entries for the next 7 days
// createEntriesForNext7Days();




// Book API


// Function to find an available table for the specified date and time
async function findAvailableTable(dateTime) {
  try {
    const slotTime = dateTime.getHours();
    const slotDate = dateTime.toISOString().slice(0, 10);

    console.log(`Searching for available table on ${slotDate} at ${slotTime} o'clock.`);

    // Query the restaurant_tables table to find an available table for the specified date and time slot
    const selectSql = 'SELECT tableID, slot FROM restaurant_tables WHERE DATE(slot->"$.date") = ?';

    const [rows, fields] = await db.query(selectSql, [slotDate]);

    for (const row of rows) {
      const slotData = row.slot; // No need to parse if it's already an object

      console.log(`Checking tableID: ${row.tableID}`);

      // Find the slot that matches the specified time
      const matchingSlot = slotData.slots.find(slot => {
        const [startTime, endTime] = slot.time.split(' - ');
        const slotStartTime = parseInt(startTime, 10);
        const slotEndTime = parseInt(endTime, 10);

        return slotStartTime <= slotTime && slotTime < slotEndTime;
      });

      if (matchingSlot && matchingSlot.availability === 'available') {
        console.log(`Found available table: ${row.tableID}`);
        return { tableID: row.tableID, slot: matchingSlot };
      }
    }

    console.log('No available table found for the specified date and time.');
    return null;
  } catch (error) {
    console.error('Error in findAvailableTable:', error);
    return null;
  }
}




// Function to mark a table as unavailable for the specified date and time
// Function to mark a slot as unavailable for the specified date and time
// Updated markTableAsUnavailable function
// Updated markTableAsUnavailable function with date reduction
async function markTableAsUnavailable(tableID, dateTime) {
  try {
   

    // Extract the date and time components
    const slotDate = new Date(dateTime);
    slotDate.setDate(slotDate.getDate() );

    const slotTime = dateTime.getHours();

    // Format the date in 'YYYY-MM-DD' format
    const formattedSlotDate = slotDate.toISOString().slice(0, 10);

    // Query the restaurant_tables table to find the specified table and date
    const selectSql = 'SELECT slot FROM restaurant_tables WHERE tableID = ? AND DATE(slot->"$.date") = ?';

    console.log('Executing SELECT query:', selectSql, 'with values:', [tableID, formattedSlotDate]);

    const [rows, fields] = await db.query(selectSql, [tableID, formattedSlotDate]);

    if (rows.length === 1) {
      const slotData = rows[0].slot;

      // Find the slot that matches the specified time
      const matchingSlot = slotData.slots.find(slot => {
        const [startTime, endTime] = slot.time.split(' - ');
        const slotStartTime = parseInt(startTime, 10);
        const slotEndTime = parseInt(endTime, 10);

        return slotStartTime <= slotTime && slotTime < slotEndTime;
      });

      if (matchingSlot && matchingSlot.availability === 'available') {
        // Mark the slot as unavailable
        matchingSlot.availability = 'unavailable';

        // Update the slot data in the database
        const updateSql = 'UPDATE restaurant_tables SET slot = ? WHERE tableID = ? AND DATE(slot->"$.date") = ?';
        const updateValues = [JSON.stringify(slotData), tableID, formattedSlotDate];
        console.log('Executing UPDATE query:', updateSql, 'with values:', updateValues);

        await db.query(updateSql, updateValues);
        console.log('Table marked as unavailable successfully.');
        return true;
      }
    }

    console.log('Table could not be marked as unavailable.');
    return false;
  } catch (error) {
    console.error('Error marking the table as unavailable:', error);
    return false;
  }
}

//Actual Endpoint
app.post('/book', async (req, res) => {
  try {
    const { name, email, dateTime, numberOfPeople, specialRequest, userId } = req.body;

    // Check if any of the required fields are null
    if (!name || !email || !dateTime || numberOfPeople === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the provided dateTime is within the valid range (current time to the next 7 days)
    const currentDate = new Date();
    const next7Days = new Date();
    next7Days.setDate(currentDate.getDate() + 7);

    // Split the user input and create a Date object with the desired format
    const [datePart, timePart] = dateTime.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');
    const inputDateTime = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

    if (inputDateTime < currentDate || inputDateTime > next7Days) {
      return res.status(400).json({ message: 'Select a date and time within the next 7 days.' });
    }

    // Find an available table for the input date and time
    const availableTable = await findAvailableTable(inputDateTime);

    if (!availableTable) {
      return res.status(400).json({ message: 'No available tables for the selected date and time.' });
    }

    const tableID = availableTable.tableID;

    // Insert booking data into the Bookings table, including the 'tableID', 'numberOfPeople', and 'userID'
    const bookTableSql = 'INSERT INTO Bookings (name, email, numberOfPeople, dateTime, specialRequest, tableID, userID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email, numberOfPeople, inputDateTime, specialRequest, tableID, userId];

    await db.query(bookTableSql, values);

    // Mark the table status as unavailable for the specific date and time slot
    markTableAsUnavailable(tableID, inputDateTime);

    // Return the tableID in the response
    return res.status(200).json({ message: 'Table booked successfully', tableID: tableID });
  } catch (error) {
    console.error('Error during table booking: ' + error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


//Feedback End point

app.post('/feedback', async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;

    // Check if any of the required fields are null
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert feedback data into the Feedback table, including the 'userID'
    const feedbackSql = 'INSERT INTO Feedback (name, email, subject, message, userID) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, subject, message, userId];

    await db.query(feedbackSql, values);

    // Return a success message
    return res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error during feedback submission: ' + error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// Create a Date object for a specific date and time
// const testDateTime = new Date('2023-10-29T15:00:00'); // Example: October 29, 2023, at 15:00 (3:00 PM)
// console.log(testDateTime)
// // Call the findAvailableTable function with the testDateTime
// findAvailableTable(testDateTime)
//   .then((result) => {
//     if (result) {
//       console.log('Available table found:', result);
//     } else {
//       console.log('No available table found for the specified date and time.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error while testing findAvailableTable:', error);
//   });



// const tableID = 20; // Replace with the actual table ID you want to mark as unavailable
// const dateTime = new Date('2023-11-02T21:00:00'); // Replace with the desired date and time

// markTableAsUnavailable(tableID, dateTime)
//   .then((result) => {
//     if (result) {
//       console.log('Table marked as unavailable successfully.');
//     } else {
//       console.log('Table could not be marked as unavailable.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error marking the table as unavailable:', error);
//   });

// Assuming you have a valid 'date' object
// const dateToDelete = new Date('2023-10-28'); // Replace with your desired date

// deleteOldEntries(dateToDelete)
//   .then(() => {
//     console.log('Old entries deleted successfully.');
//   })
//   .catch((error) => {
//     console.error('Error deleting old entries:', error);
//   });


// Start the server


// search api end point

app.post("/api/search", async (req, res) => {
  try {
    const qry = req.body.query;
    let query;

    if (qry.length === 0) {
      query = "select * from Menu";
    } else {
      query = "select * from Menu where Name like ?";
    }

    const [result] = await db.query(query, [`%${qry}%`]);
    res.json(result);
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Order cart endpoint


app.get("/api/1/quantity", async (req, res) => {
  try {
    const query1 = "select Menu.Id, Ordertab.Quantity from Menu left join Ordertab on Ordertab.food_id = Menu.ID and Ordertab.table_no = 1 and Ordertab.status = 'Ordered'";
    const [result1] = await db.query(query1);
    const categories = result1.map((row) => (row.Quantity !== null ? row.Quantity : 0));

    const query2 =
      "select count(Quantity) as TQ, sum(Ordertab.Quantity * (select Price from Menu where Menu.ID = Ordertab.food_id)) as TP from Ordertab where Ordertab.table_no = 1 and Ordertab.status = 'Ordered'";
    const [result2] = await db.query(query2);

    res.json({ "quantity": categories, "TQ": result2[0].TQ, "TP": result2[0].TP });
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/api/1/order", async (req, res) => {
  try {
    const updateQuery =
      "update Ordertab set status = 'Served' where table_no = 1 and status = 'Ordered'";
    await db.query(updateQuery);

    const selectQuery =
      "select Ordertab.order_id, Ordertab.food_id, Ordertab.Quantity, Menu.Name, Menu.Price, Menu.Image, Menu.Subcategory, Menu.Category from Ordertab, Menu where Ordertab.food_id = Menu.ID and Ordertab.table_no = 1 and Ordertab.status = 'Ordered'";
    const [result] = await db.query(selectQuery);

    res.json(result);
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/1/order_cart", async (req, res) => {
  const ind = req.body.idx;
  const mode = req.body.mode;

  try {
    let query;
    const selectQuery = "select Quantity from Ordertab where food_id = ? and table_no = 1 and status='Ordered'";
    const [selectResults] = await db.query(selectQuery, [ind + 1]);

    if (mode === "inc") {
      if (selectResults.length === 0) {
        // If no results found, insert a new row
        query =
          "insert into Ordertab (food_id, table_no, status, time, Quantity) values ?";
        const values = [[ind + 1, 1, "Ordered", new Date(), 1]];
        const insertResult = await db.query(query, [values]);
        console.log(insertResult);
        res.json({ "qty": 1 });
      } else {
        // If results found, update the existing row
        query =
          "update Ordertab set Quantity = Quantity + 1 where food_id = ? and table_no = 1 and status='Ordered'";
        const updateResult = await db.query(query, [ind + 1]);
        console.log(updateResult);
        res.json({ "qty": selectResults[0].Quantity + 1 });
      }
    } else {
      if (selectResults.length === 0) {
        res.json({ "idx": 0 });
      } else {
        if (selectResults[0].Quantity === 1) {
          query = "delete from Ordertab where food_id= ? and table_no = 1 and status='Ordered'";
          const deleteResult = await db.query(query, [ind + 1]);
          await db.query("alter table Ordertab auto_increment=1");
          console.log(deleteResult);
          res.json({ "qty": 0 });
        } else {
          query =
            "update Ordertab set Quantity = Quantity - 1 where food_id = ? and table_no = 1 and status='Ordered'";
          const updateResult = await db.query(query, [ind + 1]);
          console.log(updateResult);
          res.json({ "qty": selectResults[0].Quantity - 1 });
        }
      }
    }
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/api/1/getcart", async (req, res) => {
  try {
    const query =
      "select Ordertab.order_id, Ordertab.food_id, Ordertab.Quantity, Menu.Name, Menu.Price, Menu.Image, Menu.Subcategory, Menu.Category from Ordertab, Menu where Ordertab.food_id = Menu.ID and Ordertab.table_no = 1 and Ordertab.status = 'Ordered'";

    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    console.error('Error executing SQL query: ' + err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
