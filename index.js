const express = require("express");
const path = require("path");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(cors());
app.use(express.json());
const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.post("/userVerification/", async (request, response) => {
  const userDetails = request.body;
  const { username, email, age, location } = userDetails;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (age >= 18 && age <= 45 && emailRegex.test(email)) {
    response.send("true");
  } else {
    response.send("false");
  }
});
