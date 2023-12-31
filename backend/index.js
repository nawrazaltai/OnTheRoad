import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Stripe from "stripe";

const app = express();
const PORT = 4000;
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json());
app.use(cookieParser());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:19006",
    // origin: "http://10.0.2.2:3000",
  })
);

// PAYMENY ENDPOINT
app.post("/payment-sheet", async (req, res) => {
  // console.log(req.body);
  const { price } = req.body;
  // console.log(req.body);
  // Use an existing Customer ID if this is a returning customer.

  const customers = await stripe.customers.list({
    email: req.body.email,
  });
  let customer;
  if (customers.data.length < 1) {
    customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.fullName,
    });
  } else {
    customer = customers.data[0];
  }

  // return customer;

  // const customer = customers?.data?.filter((c) => {
  //   if (c.email !== req.body.email) {
  //     await stripe.customers.create ({
  //       email: req.body.email,
  //       name: req.body.fullName})
  //     }
  //     else {
  //       return customer
  //     }
  // });

  // let customer;

  // if (!filteredCustomer) {
  //   return (customer = await stripe.customers.create({
  //     email: req.body.email,
  //     name: req.body.fullName,
  //   }));
  // }
  // customer = filteredCustomer;

  // console.log(customer);
  // const customer = await stripe.customers.create({
  //   email: req.body.email,
  //   name: req.body.fullName,
  // });

  // const customers = await stripe.customers.list({});
  // console.log("customers: ", customers.data.length);

  // const customers = await stripe.customers.search({
  //   query: `email: "${req.body.email}"`,
  // });

  // let customer;
  // console.log("Customer: ", customers[0]);
  // customer = customers[0];

  const ephemeralKey = await stripe.ephemeralKeys?.create(
    { customer: customer?.id },
    { apiVersion: "2022-11-15" }
  );
  const paymentIntent = await stripe.paymentIntents?.create({
    payment_method_types: ["card"],
    amount: price,
    currency: "usd",
    customer: customer?.id,
    // setup_future_usage: "on_session",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    metadata: {
      car: "",
      start_date: "",
      end_date: "",
      total_days: "",
    },
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  });

  // console.log(customer.id);

  res.json({
    paymentIntent: paymentIntent?.client_secret,
    ephemeralKey: ephemeralKey?.secret,
    customer: customer?.id,
    publishableKey: process.env.STRIPE_PUBLISH_KEY,
  });
});

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
          return;
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
        return;
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
        return;
      }
      res.status(200).json({ emailCheck: result[0]?.email });
    }
  );
});

app.get("/cars", (req, res) => {
  connection.query("SELECT * FROM cars", [], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.json({ cars: result });
  });
});

app.post("/bookings", (req, res) => {
  // console.log(req.body);
  const booking = req.body.booking;
  const selected_dates = req.body.booked_dates;
  // console.log(selected_dates);
  const { car_id, start_date, end_date, total_days, total_price, renter } =
    booking;

  // console.log(car_id, start_date, end_date, total_days, total_price, renter);

  let results = [];
  connection.query(
    "INSERT INTO bookings(car_id, start_date, end_date, total_days, total_price, rented_by) VALUES (?,?,?,?,?,?)",
    [car_id, start_date, end_date, total_days, total_price, renter],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
        // console.log(err);
      } else {
        // console.log(result);
        const bookingId = result.insertId;
        for (let i = 0; i < selected_dates.length; i++) {
          let date = selected_dates[i];
          connection.query(
            "INSERT INTO booked_dates (booking_id, car_id, date) VALUES (?,?,?)",
            [bookingId, car_id, date],
            (err, result) => {
              if (err) {
                res.sendStatus(500);
              } else {
                results.push(result);
              }
            }
          );
        }
      }
      res.json({ bookingDetails: results });
    }
  );
});

app.post("/bookings/dates", (req, res) => {
  // console.log(req.body);
  const { car_id } = req.body;

  connection.query(
    "SELECT date from booked_dates WHERE car_id = ?",
    [car_id],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(result);
      }
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
