require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

/*
-----------------------------------
Middleware
-----------------------------------
*/
app.use(cors());
app.use(express.json());

/*
-----------------------------------
Database Connection
-----------------------------------
*/

connectDB();

/*
-----------------------------------
Routes
-----------------------------------
*/

app.use("/api/appointments", require("./routes/appointments"));

/*
-----------------------------------
Start Server
-----------------------------------
*/

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});