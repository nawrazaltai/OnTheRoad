import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

const connection = mysql.createConnection({
  // host: "localhost",
  host: "45.79.250.211",
  user: "test",
  password: "password",
  // user: "root",
  // password: "",
  // password: process.env.DB_PASS,
  database: "ontheroad",
});

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:19006",
    // origin: "http://10.0.2.2:3000",
  })
);

// REGISTER
app.post("/users", (req, res) => {
  const user = req.body;
  const { firstName, lastName, email, password } = user;

  // console.log(req.body);
  //   connection.query(
  //     "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
  //     [firstName, lastName, email, password],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.sendStatus(500);
  //       }
  //       return result;
  //     }
  //   );
  // });

  connection.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
    [firstName, lastName, email, password],
    (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY" || err.errno == 1062) {
          res.send({
            error: `User ${email} already exists, please try another one`,
          });
          // console.log(
          //   "The entered Email already exists, please try another one"
          // );
        } else {
          res.send({ error: err.sqlMessage });
          // console.log("Error:", err.sqlMessage);
        }
        // console.log(err);
        // res.sendStatus(500);
      } else {
        console.log("success");
        res.send({ success: `User ${email} successfully registered!` });
        return result;
      }
    }
  );
});

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
}

//LOGIN
app.post("/login", (req, res) => {
  const user = req.body;
  const { email, password } = user;

  // console.log(req.body);
  connection.query(
    "SELECT * FROM users WHERE `email` = ? AND `password` = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      }
      if (result.length > 0) {
        // console.log(result[0].id);
        const userId = result[0].id;
        const token = generateAccessToken(userId);
        // console.log(token);
        res.send({ data: result[0], token });
      } else {
        console.log("fail");
      }
    }
  );
});

app.post("/userAvailable", (req, res) => {
  const user = req.body.email;
  // console.log(user);

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [user],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      }
      res.status(200).json({ emailCheck: result[0]?.email });
    }
  );
});

app.get("/cars", (req, res) => {
  connection.query("SELECT * FROM cars", [], (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json({ cars: result });
  });
});

app.get("/brands", (req, res) => {
  connection.query("SELECT * FROM brands", [], (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json({ brands: result });
  });
});

app.post("/cars/brand", (req, res) => {
  const brand = req.body.brand;

  connection.query(
    "SELECT * FROM cars WHERE brand = ?",
    [brand],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      }
      res.json({ brand: result });
    }
  );
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log("DB Connected");
      console.log("Server started on port " + PORT);
    });
  }
});

// app.listen(PORT, () => {
//   console.log("listening on PORT ", PORT);
// });
