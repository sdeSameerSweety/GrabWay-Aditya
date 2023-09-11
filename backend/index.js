const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { mongoose, models } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const UserModel = require("./Schema/User");
const DriverModel = require("./Schema/Driver");
const EmailModel = require("./Schema/Email");
var haversine = require("haversine-distance");

//google mail and Nodemailer
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OrderModel = require("./Schema/Order");
const CLIENT_ID =
  "496366764705-a756l0dqt95hq8a3d9vrbcif2nud3a3u.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFERESH_TOKEN =
  "1//04o76Ui3AbBUoCgYIARAAGAQSNwF-L9Ir39VJ9FIAo8kukHMCFFYwfyO9z4A3rmzXBdW9rLacGVXDB7RvAvMeoUSw7MNNXaDqKW8";
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFERESH_TOKEN });

//environment variables
const MONGO_URL = process.env.MONGO_URL;
const PUBLIC_URL = "http://localhost:3000";
const PORT = process.env.PORT;
const jwtSecretKey = process.env.JWT_SECRET;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    methods: "GET,POST,PATCH,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    origin: PUBLIC_URL,
    credentials: true,
  })
);
app.options("*", cors());

//fucntion to send mail
async function sendMail(emailOfUser, otp) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "grabwayhelpdesk@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFERESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "GRABWAY SUPPORT <grabwayhelpdesk@gmail.com>",
      to: emailOfUser,
      subject: "Otp Verification for GrabWay",
      text: `Your One-Time Password for Email verifcation is ${otp}`,
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">GrabWay</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing GrabWay. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />GrabWay</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>GrabWay Pvt Ltd.</p>
          <p>Bhubaneswar</p>
          <p>India</p>
        </div>
      </div>
    </div>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
}

app.post("/verifyEmail", (req, res) => {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  try {
    const otp = randomNumber(1000, 9999);
    const randomOTP = otp + 2025;
    const email = req.body.signupEmail;
    const Email = sendMail(email, otp);
    if (Email) {
      console.log("Email sent successfully");
      res.status(200).json(randomOTP);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/checkuser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  if (req.body.email) {
    const email = req.body.email;
    console.log(email);
    try {
      const UserEmail = await EmailModel.findOne({ email: email });
      if (UserEmail !== null) {
        console.log("UserEmail found");
        const userType = UserEmail.userType;
        const email = UserEmail.email;
        if (userType === "user") {
          console.log("user");
          const UserData = await UserModel.findOne({ email });
          res.status(200).json(UserData);
        }
        if (userType === "driver") {
          console.log("driver");
          const UserData = await DriverModel.findOne({ email });
          res.status(200).json(UserData);
        }
      } else {
        console.log(UserEmail);
        res.status(200).json(null);
      }
    } catch (err) {
      res.status(200).send(err);
      console.log(err);
    }
  } else {
    res.status(200).json(null);
    console.log("email not found in body");
  }
});
//all the data will be coming to user context function
app.post("/createUser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const email = req.body.signupEmail;
  const phoneNumber = req.body.signupPhone;
  if (email && phoneNumber) {
    try {
      console.log("trying to create user model");
      const EmailRes = await EmailModel.create({
        email: email,
        userType: "user",
      });
      if (EmailRes) {
        const User = await UserModel.create({
          email: email,
          phoneNumber: phoneNumber,
          userType: "user",
          name: "",
        });
        return res.status(200).json(User);
      } else {
        res.status(500).json("cannot create user model");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
});
app.post("/createDriver", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const email = req.body.signupEmail;
  const phoneNumber = req.body.signupPhone;
  if (email && phoneNumber) {
    try {
      console.log("trying to create user model");
      const EmailRes = await EmailModel.create({
        email: email,
        userType: "driver",
      });
      if (EmailRes) {
        const User = await DriverModel.create({
          email: email,
          phoneNumber: phoneNumber,
          userType: "driver",
          name: "",
        });
        return res.status(200).json(User);
      } else {
        res.status(500).json("cannot create user model");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/editprofile", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const data = req.body.sendData;
  console.log(data);
  try {
    if (data.userType === "user") {
      const updatedResponse = await UserModel.updateOne(
        {
          email: data.email,
        },
        {
          $set: {
            name: data.fname + " " + data.lname,
            phoneNumber: data.phone,
            "address.0.addressName": data.fname + " " + data.lname,
            "address.0.addressLine1": data.address1,
            "address.0.addressLine2": data.address2,
            "address.0.city": data.city,
            "address.0.state": data.state,
            "address.0.pincode": data.pin,
          },
        }
      );
      if (updatedResponse) {
        return res.status(200).json(updatedResponse);
      } else {
        return res.status(500).json(null);
      }
    }
    if (data.userType === "driver") {
      console.log(data);
      const updatedResponse = await DriverModel.updateOne(
        {
          email: data.email,
        },
        {
          $set: {
            name: data.fname + " " + data.lname,
            phoneNumber: data.phone,
            VehicleNumber: data.vnumber,
            drivingLicenseNumber: data.dlnumber,
            "address.0.addressName": data.fname + " " + data.lname,
            "address.0.addressLine1": data.address1,
            "address.0.addressLine2": data.address2,
            "address.0.city": data.city,
            "address.0.state": data.state,
            "address.0.pincode": data.pin,
          },
        }
      );
      if (updatedResponse) {
        return res.status(200).json(updatedResponse);
      } else {
        return res.status(500).json(null);
      }
    }
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//api for google login below
app.post("/googlecheckUser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const email = req.body.email;
  console.log(email);
  const UserEmail = await EmailModel.findOne({ email });
  if (UserEmail !== null) {
    console.log("User email found");
    //console.log(UserEmail);
    res.status(200).json(email);
  } else {
    console.log("not found, Redirect to creation....");
    res.status(500).json(false);
  }
});
app.post("/googleCreateUser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const formData = req.body.formData;
  const name = formData.name;
  const email = formData.email;
  const phoneNumber = formData.phoneNumber;
  const addressName = formData.name;
  const addressLine1 = formData.addressLine1;
  const addressLine2 = formData.addressLine2;
  const city = formData.city;
  const state = formData.state;
  const pin = formData.pin;
  const profilePicture = formData.imgDp;
  if (email && formData) {
    try {
      console.log("trying to create email model");
      const EmailRes = await EmailModel.create({
        email: email,
        userType: "user",
      });
      if (EmailRes) {
        console.log("trying to create user model", pin);
        const User = await UserModel.create({
          email: email,
          phoneNumber: phoneNumber,
          userType: "user",
          profilePicture: profilePicture,
          name: name,
          "address.0.addressName": addressName,
          "address.0.addressLine1": addressLine1,
          "address.0.addressLine2": addressLine2,
          "address.0.city": city,
          "address.0.state": state,
          "address.0.pincode": pin,
        });
        return res.status(200).json(User);
      } else {
        res.status(500).json("cannot create user model");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/googleCreateDriver", async (req, res) => {
  await mongoose.connect(MONGO_URL);

  const formData = req.body.formData;
  console.log(formData);
  const name = formData.name;
  const email = formData.email;
  const phoneNumber = formData.phoneNumber;
  const addressName = formData.name;
  const addressLine1 = formData.addressLine1;
  const addressLine2 = formData.addressLine2;
  const city = formData.city;
  const state = formData.state;
  const pin = formData.pin;
  const VehicleNumber = formData.carNumber;
  const drivingLicenseNumber = formData.dlNumber;
  const experience = formData.experience;
  const profilePicture = formData.imgDp;
  if (email && formData) {
    try {
      console.log("trying to create email model");
      const EmailRes = await EmailModel.create({
        email: email,
        userType: "driver",
      });
      if (EmailRes) {
        console.log("trying to create user model");
        const User = await DriverModel.create({
          email: email,
          name: name,
          phoneNumber: phoneNumber,
          VehicleNumber: VehicleNumber,
          drivingLicenseNumber: drivingLicenseNumber,
          profilePicture: profilePicture,
          experience: experience,
          userType: "driver",
          "address.0.addressName": addressName,
          "address.0.addressLine1": addressLine1,
          "address.0.addressLine2": addressLine2,
          "address.0.city": city,
          "address.0.state": state,
          "address.0.pincode": pin,
        });
        return res.status(200).json(User);
      } else {
        res.status(500).json("cannot create user model");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

//api for normal registration with prefilled email,phone number
app.post("/registerNewUser", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  console.log(req.body.formData);
  const formData = req.body.formData;
  const name = formData.name;
  const email = formData.email;
  const phoneNumber = formData.phoneNumber;
  const addressName = formData.name;
  const addressLine1 = formData.addressLine1;
  const addressLine2 = formData.addressLine2;
  const city = formData.city;
  const state = formData.state;
  const pin = formData.pin;
  const profilePicture = formData.imgDp;
  if (formData) {
    try {
      const updatedResponse = await UserModel.updateOne(
        {
          email: email,
        },
        {
          $set: {
            profilePicture: profilePicture,
            name: name,
            phoneNumber: phoneNumber,
            "address.0.addressName": addressName,
            "address.0.addressLine1": addressLine1,
            "address.0.addressLine2": addressLine2,
            "address.0.city": city,
            "address.0.state": state,
            "address.0.pincode": pin,
          },
        }
      );
      if (updatedResponse) {
        res.status(200).json(true);
      } else {
        res.status(200).json(null);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in try catch");
    }
  } else {
    res.status(500).json("Internal Server Error");
  }
});

app.post("/registerNewDriver", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  //console.log(req.body.formData);
  const formData = req.body.formData;
  const name = formData.name;
  const email = formData.email;
  const phoneNumber = formData.phoneNumber;
  const addressName = formData.name;
  const addressLine1 = formData.addressLine1;
  const addressLine2 = formData.addressLine2;
  const city = formData.city;
  const state = formData.state;
  const pin = formData.pin;
  const VehicleNumber = formData.carNumber;
  const drivingLicenseNumber = formData.dlNumber;
  const experience = formData.experience;
  const profilePicture = formData.imgDp;
  if (formData) {
    try {
      const updatedResponse = await DriverModel.updateOne(
        {
          email: email,
        },
        {
          $set: {
            name: name,
            phoneNumber: phoneNumber,
            VehicleNumber: VehicleNumber,
            profilePicture: profilePicture,
            drivingLicenseNumber: drivingLicenseNumber,
            experience: experience,
            "address.0.addressName": addressName,
            "address.0.addressLine1": addressLine1,
            "address.0.addressLine2": addressLine2,
            "address.0.city": city,
            "address.0.state": state,
            "address.0.pincode": pin,
          },
        }
      );
      if (updatedResponse) {
        res.status(200).json(true);
      } else {
        res.status(200).json(null);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in try catch");
    }
  } else {
    res.status(500).json("Internal Server Error");
  }
});

app.post("/routeDriverRegistration", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  console.log(req.body.formData);

  const formData = req.body.formData;
  const email = formData.email;
  const originText = formData.originText;
  const originLat = formData.originLat;
  const originLong = formData.originLong;
  const destinationText = formData.destinationText;
  const destinationLat = formData.destinationLat;
  const destinationLong = formData.destinationLong;
  const originStartTime = formData.originStartTime;
  const originEndTime = formData.originEndTime;
  const destinationStartTime = formData.destinationStartTime;
  const destinationEndTime = formData.destinationEndTime;
  const seats = formData.seats;
  if (formData) {
    try {
      const updatedResponse = await DriverModel.updateOne(
        { email: email },
        {
          $push: {
            routes: {
              seats: seats,
              plan: "basic",
              origin: [{ text: originText, lat: originLat, long: originLong }],
              destination: [
                {
                  text: destinationText,
                  lat: destinationLat,
                  long: destinationLong,
                },
              ],
              originTime: [{ start: originStartTime, end: originEndTime }],
              destinationTime: [
                { start: destinationStartTime, end: destinationEndTime },
              ],
            },
          },
        }
      );
      if (updatedResponse) {
        res.status(200).json(true);
      } else {
        res.status(200).json(null);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in try catch");
    }
  } else {
    res.status(500).json("Didn't recieve Form Data");
  }
});

//function to find overlapping time intervals;
function overlappingIntervals(interval1, interval2) {
  "use strict";

  // Check if the start time of interval1 is before the end time of interval2
  if (interval1.start < interval2.end) {
    // Check if the end time of interval1 is after the start time of interval2
    if (interval1.end > interval2.start) {
      // The two intervals overlap
      return true;
    }
  }

  // The two intervals do not overlap
  return false;
}

app.post("/routeUserSearch", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  //console.log(req.body.formData);

  const formData = req.body.formData;
  const email = formData.email;
  const originTextUser = formData.originText;
  const originLatUser = formData.originLat;
  const originLongUser = formData.originLong;
  const destinationTextUser = formData.destinationText;
  const destinationLatUser = formData.destinationLat;
  const destinationLongUser = formData.destinationLong;
  const originStartTimeUser = formData.originStartTime;
  const originEndTimeUser = formData.originEndTime;
  const destinationStartTimeUser = formData.destinationStartTime;
  const destinationEndTimeUser = formData.destinationEndTime;
  const MatchedData = [];
  if (formData) {
    try {
      const userStateResponse = await UserModel.findOne({ email: email });
      if (userStateResponse) {
        const userState = userStateResponse.address[0].state;
        //console.log(userState);
        const DriverResponse = await DriverModel.aggregate([
          {
            $match: {
              "address.state": userState,
            },
          },
        ]);
        //console.log(DriverResponse);
        for (let i = 0; i < DriverResponse.length; i++) {
          const DriverDetails = DriverResponse[i].routes;
          //console.log(DriverDetails);
          for (let j = 0; j < DriverDetails.length; j++) {
            const eachRoute = DriverDetails[j];
            const originLat = eachRoute.origin[0].lat;
            const originLong = eachRoute.origin[0].long;
            const destinationLat = eachRoute.destination[0].lat;
            const destinationLong = eachRoute.destination[0].long;
            //First point in your haversine calculation
            var point1 = { lat: originLat, lng: originLong };

            //Second point in your haversine calculation
            var point2 = { lat: originLatUser, lng: originLongUser };
            var distanceOrigin_m = haversine(point1, point2); //Results in meters (default)
            var distanceOrigin_km = distanceOrigin_m / 1000; //Results in kilometers
            //console.log("distance (in meters): " + haversine_m + "m");
            //console.log("distance (in kilometers): " + haversine_km + "km");
            if (distanceOrigin_km <= 2) {
              var point3 = { lat: destinationLat, lng: destinationLong };

              //Second point in your haversine calculation
              var point4 = {
                lat: destinationLatUser,
                lng: destinationLongUser,
              };
              var distanceDestination_m = haversine(point1, point2); //Results in meters (default)
              var distanceDestination_km = distanceDestination_m / 1000; //Results in kilometers
              if (distanceDestination_km <= 2) {
                var originTimeStart = eachRoute.originTime[0].start;
                var originTimeEnd = eachRoute.originTime[0].end;

                //till here we are getting same route drivers.
                //Now we will do origin time matching
                const intervalUser = {
                  start: originStartTimeUser,
                  end: originEndTimeUser,
                };

                const intervalDriver = {
                  start: originTimeStart,
                  end: originTimeEnd,
                };
                //console.log(eachRoute)
                //console.log(overlappingIntervals(intervalUser, intervalDriver));
                const resultOriginTimeMatch = overlappingIntervals(
                  intervalUser,
                  intervalDriver
                );
                if (resultOriginTimeMatch) {
                  //now we will do destination time matching
                  var destinationTimeStart = eachRoute.destinationTime[0].start;
                  var destinationTimeEnd = eachRoute.destinationTime[0].end;
                  const intervalUser = {
                    start: destinationStartTimeUser,
                    end: destinationEndTimeUser,
                  };

                  const intervalDriver = {
                    start: destinationTimeStart,
                    end: destinationTimeEnd,
                  };
                  const resultDestinationTimeMatch = overlappingIntervals(
                    intervalUser,
                    intervalDriver
                  );
                  //console.log(resultDestinationTimeMatch);
                  if (resultDestinationTimeMatch) {
                    const RouteCardData = {
                      email: DriverResponse[i].email,
                      VehicleManufacturer: "Maruti Suzuki",
                      VehcileModel: "Swift Dzire",
                      RouteAtIndex: j,
                      route: eachRoute,
                      driverName: DriverResponse[i].name,
                    };
                    MatchedData.push(RouteCardData);
                  }
                }
              }
            }
          }
        }
        if (MatchedData.length !== 0) {
          res.status(200).json(MatchedData);
        } else {
          res.status(500).json("No Drivers Found");
        }
      } else {
        res.status(500).json("user is not present in database");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in try catch");
    }
  } else {
    res.status(500).json("Internal Server Error");
  }
});

app.post("/moreDetailsForMatchRoutes", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  console.log(req.body.matchDriverRoute);
  const matchDriverRoute = req.body.matchDriverRoute;
  const email = matchDriverRoute.email;
  const RouteAtIndex = matchDriverRoute.RouteAtIndex;
  try {
    if (email) {
      //console.log(email);
      const DriverData = await DriverModel.findOne({ email: email });
      console.log(DriverData);
      if (DriverData) {
        const ResponseData = {
          profilePicture: DriverData.profilePicture,
          email: DriverData.email,
          name: DriverData.name,
          phoneNumber: DriverData.phoneNumber,
          userType: DriverData.userType,
          address: DriverData.address[0],
          route: DriverData.routes[RouteAtIndex],
          VehicleNumber: DriverData.VehicleNumber,
          drivingLicenseNumber: DriverData.drivingLicenseNumber,
          profilePicture: DriverData.profilePicture,
        };
        return res.status(200).json(ResponseData);
      } else {
        return res.status(500).json("Didnt find Driver in Database");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json("Error caught in catch block");
  }
});

app.post("/bookRoute", async (req, res) => {
  const matchDriverRoute = req.body.matchDriverRoute;
  const userData = req.body.userDetails;
  const RouteId = matchDriverRoute.route._id;
  const userQuery = req.body.UserQuery.UserQuery;
  const driverEmail = matchDriverRoute.email;
  const userEmail = userData.email;
  const seatNumber = matchDriverRoute.seats;
  const userOriginText = userQuery.originText;
  const userOriginLat = userQuery.originLat;
  const userOriginLong = userQuery.originLong;
  const userDestinationText = userQuery.destinationText;
  const userDestinationLat = userQuery.destinationLat;
  const userDestinationLong = userQuery.destinationLong;
  const userOriginTime = userQuery.originStartTime;
  const userDestinationTime = userQuery.destinationStartTime;
  const plan = matchDriverRoute.plan;
  const driverName = matchDriverRoute.name;
  const amount = req.body.price; //make it dynamic
  const paymentMethod = "cash"; //make it dyanmic
  console.log(amount);
  try {
    if (driverEmail && userEmail && userQuery) {
      const DriverModificationResponse = await DriverModel.updateOne(
        {
          email: driverEmail,
          "routes._id": new mongoose.Types.ObjectId(RouteId),
        },
        {
          $push: {
            "routes.$.customers": {
              email: userEmail,
              name: userData.name,
              seatNumber: seatNumber,
              "originLocation.0.text": userOriginText,
              "originLocation.0.lat": userOriginLat,
              "originLocation.0.long": userOriginLong,
              "destinationLocation.0.text": userDestinationText,
              "destinationLocation.0.lat": userDestinationLat,
              "destinationLocation.0.long": userDestinationLong,
              originTime: userOriginTime,
              destinationTime: userDestinationTime,
              //price:price for that user
            },
          },
        }
      );
      const UserModificationResponse = await UserModel.updateOne(
        {
          email: userEmail,
        },
        {
          $push: {
            routes: {
              "origin.text": userOriginText,
              "origin.lat": userOriginLat,
              "origin.long": userOriginLong,
              "destination.text": userDestinationText,
              "destination.lat": userDestinationLat,
              "destination.long": userDestinationLong,
              plan: plan,
              //driverEmail:driverEmail,
              //driverName:driverName,
              //routeId:RouteId
            },
          },
        }
      );
      const OrderCreationResponse = await OrderModel.create({
        driverEmail: driverEmail,
        userEmail: userEmail,
        plan: plan,
        amount: amount,
        paymentMethod: paymentMethod,
      });
      if (
        OrderCreationResponse &&
        DriverModificationResponse &&
        UserModificationResponse
      ) {
        res.status(200).json({
          DriverAddtitionResponse: DriverModificationResponse,
          OrderCreationResponse: OrderCreationResponse,
          UserModificationResponse: UserModificationResponse,
        });
      } else {
        res.status(500).json("Problem in if else");
      }
    } else {
      res.status(500).json("Didn't get data");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error caught in try catch block");
  }
});

maxAge = 24 * 60 * 60;

app.post("/profiledata", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const token = req.body.token;
  if (token) {
    tokenData = jwt.verify(token, jwtSecretKey);
    //console.log(tokenData.email)
    const tokenEmail = tokenData.email;
    //console.log(tokenEmail)
    const UserData = await User.findOne({ email: tokenEmail });
    res.status(200).send(UserData);
  } else {
    res.json(null);
  }
});

/*
app.post('/addtocart', async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const userId = req.body.userId;
  const productId = req.body.userId;
  if (userId && productId) {
    const response= await CartModel.findOne({userId});
    
    if(response!==null){
      if(response.products!==undefined){
      //console.log(response);
      const userId=response.userId;
      const products=response.products;
      console.log(products);
      let count=0;
      let indexOfProduct=0;
      if(products!==undefined){
        if(products!==null && products.length!==0){ 
          console.log("Inside present")     
          const productData=await CartModel.findOne({userId:userId ,"products.productId":productId})
          console.log(productData);
          if(productData.length!==0){
            console.log("product presnt already quantity increase");
            const newQuantity=products[indexOfProduct].productQuantity+1;
            console.log(newQuantity);
            const updatedResponse1=await CartModel.findOneAndUpdate({
              userId:userId
            },
            {
              $set: {
                products: [
                  {
                    productId:productId,
                    productQuantity:newQuantity,
                  },
                ],
              },
            }
            )
            res.status(200).send(updatedResponse1);//ek kam return kar raha hai udhar add karlena
            count=0;
            indexOfProduct=0;
          }
          else{
            console.log("inside else")
            const updatedResponse2 = await CartModel.updateOne(
              { userId:userId },
              {
                $push: {
                  products:
                    {
                     productId:productId,
                     productQuantity:1
                    }
                },
              }
            );
            res.status(200).send(updatedResponse2);
            count=0;
            indexOfProduct=0;
            console.log("success");
          }
        }
        else{
          console.log("inside else")
          const updatedResponse4=await CartModel.findOneAndUpdate({userId:userId},{
              $set: {
                userId:userId,
                products: [
                  {
                    productId: productId,
                    productQuantity:1
                    
                  },
                ],
              },
            
          })
          res.status(200).json('done');
          console.log(updatedResponse4.userId);
          console.log(updatedResponse4.products)
        }
      }
    }
    }
  if(response===null){
    console.log("inside create")
    const initialQuantity=1;
  const updatedResponse3=await CartModel.create({
    userId:userId,
    products:[
      {
        productId:productId,
        productQuantity:initialQuantity,
      }
    ]
  });
  res.status(200).json(updatedResponse3);
  }
}});
*/

app.post("/addtocart", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const userId = req.body.userId;
  const productId = req.body.productId;
  const response = await CartModel.findOne({ userId });
  //console.log(response);
  //console.log(response.products);

  let i = 0;
  let count = 0;
  if (response === null) {
    console.log("inside create");
    const initialQuantity = 1;
    const updatedResponse3 = await CartModel.create({
      userId: userId,
      products: [
        {
          productId: productId,
          productQuantity: initialQuantity,
        },
      ],
    });
    res.status(200).json(updatedResponse3);
  } else {
    const products = response.products;
    console.log("inside else");
    if (products.length === 0) {
      console.log("inside push when length is zero");
      const updatedResponse2 = await CartModel.updateOne(
        { userId: userId },
        {
          $push: {
            products: {
              productId: productId,
              productQuantity: 1,
            },
          },
        }
      );
      res.status(200).send(updatedResponse2);
    } else {
      for (i = 0; i < products.length; i++) {
        const element = products[i].productId;
        if (element === productId) {
          count = count + 1;
        }
      }
      console.log("Inside for loop checking count");
      if (count === 0) {
        console.log("Pushed into array");
        const updatedResponse5 = await CartModel.updateOne(
          { userId: userId },
          {
            $push: {
              products: {
                productId: productId,
                productQuantity: 1,
              },
            },
          }
        );
        res.status(200).send(updatedResponse5);
      } else {
        console.log("product present already, quantity increased");
        const newQuantity = count + 1;
        console.log(newQuantity);
        const updatedResponse1 = await CartModel.findOneAndUpdate(
          {
            products: { $elemMatch: { productQuantity: newQuantity } },
          },
          {
            arrayFilters: [
              {
                userId: userId,
              },
              {
                "products.productId": productId,
              },
            ],
            new: true,
          }
        );
        res.status(200).send(updatedResponse1); //ek kam return kar raha hai udhar add karlena
      }
    }
  }
});

app.post("/cartpage", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const userId = req.body.userId;
  if (userId) {
    const cartData = await CartModel.findOne({ userId });
    const products = cartData.products;
    //console.log(products);
    let ProductsFinalArray = [];
    for (let i = 0; i < products.length; i++) {
      let eachProduct = products[i];
      let eachProductId = products[i].productId;
      let productDetails = await ProductModel.aggregate([
        {
          // first, filter the documents, that contain
          // fields with necessary values
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(
              eachProductId
            ),
          },
        },
        // the following $unwind stages will convert your arrays
        // to objects, so it would be easier to filter the messages
        {
          $unwind: "$categoryItem",
        },
        {
          $unwind: "$categoryItem.itemProducts",
        },
        {
          // filter messages here
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(
              eachProductId
            ),
          },
        },
        {
          // returns only message(s)
          $replaceWith: "$categoryItem.itemProducts",
        },
      ]);
      //console.log(productDetails[0]);
      ProductsFinalArray.push(productDetails[0]);
    }
    //console.log(ProductsFinalArray);
    replydata = {
      ProductsFinalArray: ProductsFinalArray,
      products: products,
    };
    res.status(200).send(replydata);
  } else {
    res.status(400).send("Internal Server Error");
  }
});

app.post("/address", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const AddressName = req.body.name;
  const addressLine1 = req.body.address1;
  const addressLine2 = req.body.address2;
  const phone = req.body.phone;
  const city = req.body.city;
  const state = req.body.state;
  const pincode = req.body.pincode;
  const email = req.body.email;
  try {
    console.log("Inside try");
    const UserData = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          address: [
            {
              addressName: AddressName,
              addressLine1: addressLine1,
              addressLine2: addressLine2,
              phone: phone,
              city: city,
              state: state,
              pincode: pincode,
            },
          ],
        },
      }
    );
    return res.status(200).send({
      UserData: UserData,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.post("/logout", (req, res) => {
  //res.cookie("token", "").json(true);
  res.json(true);
});

app.post("/cardForm", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const nameOnCard = req.body.nameOnCard;
  const numberOnCard = req.body.numberOnCard;
  const expiryMonthOnCard = req.body.expiryMonthOnCard;
  const expiryYearOnCard = req.body.expiryYearOnCard;
  const cvvOnCard = req.body.cvvOnCard;
  const email = req.body.email;
  try {
    console.log("Inside try");
    const UserData = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          paymentInfo: [
            {
              nameOnCard: nameOnCard,
              cardNumber: numberOnCard,
              expiryMonth: expiryMonthOnCard,
              expiryYear: expiryYearOnCard,
              cvv: cvvOnCard,
            },
          ],
        },
      }
    );
    return res.status(200).send({
      UserData: UserData,
    });
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/productsFill", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const data = req.body;
  try {
    const catNameDoc = await ProductModel.findOne({
      categoryName: data.categoryName,
    });
    if (catNameDoc) {
      const catItemDoc = await ProductModel.findOne({
        "categoryItem.itemName": data.itemName,
      });
      if (catItemDoc) {
        const productNameDoc = await ProductModel.findOne({
          "categoryItem.itemProducts.name": data.pname,
        });

        if (productNameDoc) {
          console.log("Product already exist");
        } else {
          try {
            const finProduct = await ProductModel.updateOne(
              { "categoryItem.itemName": data.itemName },
              {
                $push: {
                  "categoryItem.$.itemProducts": {
                    name: data.pname,
                    price: data.pprice,
                    description: data.pdesc,
                    imageURL: data.pimg,
                  },
                },
              }
            );
            console.log("New Products Posted");
          } catch (err) {
            console.log(err);
            return res.status(400).send("Server Error");
          }
        }
      } else {
        try {
          const ItemDoc = await ProductModel.updateOne(
            { categoryName: catNameDoc.categoryName },
            {
              $push: {
                categoryItem: {
                  itemName: data.itemName,
                  itemProducts: [
                    {
                      name: data.pname,
                      price: data.pprice,
                      description: data.pdesc,
                      imageURL: data.pimg,
                    },
                  ],
                },
              },
            }
          );
          console.log("new category Item Posted");
        } catch (err) {
          console.log(err);
          return res.status(400).send("Server error");
        }
        console.log("inside else");
      }
    } else {
      try {
        const ProductDoc = await ProductModel.create({
          categoryName: data.categoryName,
          categoryItem: [
            {
              itemName: data.itemName,
              itemProducts: [
                {
                  name: data.pname,
                  price: data.pprice,
                  description: data.pdesc,
                  imageURL: data.pimg,
                },
              ],
            },
          ],
        });
        console.log("New Category Posted");
        return res.status(200).send("Successfully Posted");
      } catch (err) {
        console.log(err);
        return res.status(400).send("Server Error");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/products/:cat/:item", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const gotData = { categoryName: req.params.cat, itemName: req.params.item };
  console.log(gotData);

  try {
    const getCategory = await ProductModel.findOne({
      categoryName: gotData.categoryName,
    });
    if (getCategory) {
      // console.log(getCategory);
      try {
        const getItem = await ProductModel.find({
          "categoryItem.itemName": gotData.itemName,
        });
        if (getItem) {
          const retData = await ProductModel.aggregate([
            {
              $match: { "categoryItem.itemName": gotData.itemName },
            },
            { $unwind: "$categoryItem" },
            { $match: { "categoryItem.itemName": gotData.itemName } },
            { $replaceWith: "$categoryItem" },
          ]);
          console.log(retData[0].itemProducts);
          res.send(retData[0].itemProducts);
        } else {
          console.log("404 /- Not Found");
        }
      } catch (err) {
        console.log("Server responded with Error");
        return res.json({ respondedData: "Server Responded with error" });
      }
    } else {
      console.log("404 /- not Found");
    }
  } catch (err) {
    console.log("Server responded with Error");
    return res.json({ respondedData: "Server Responded with error" });
  }
});

app.post("/specificproduct", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const id = req.body.id;
  console.log(id);
  if (id) {
    try {
      console.log("inside try");
      const sofa = "sofas";
      const product = await ProductModel.aggregate([
        {
          // first, filter the documents, that contain
          // fields with necessary values
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(id),
          },
        },
        // the following $unwind stages will convert your arrays
        // to objects, so it would be easier to filter the messages
        {
          $unwind: "$categoryItem",
        },
        {
          $unwind: "$categoryItem.itemProducts",
        },
        {
          // filter messages here
          $match: {
            "categoryItem.itemProducts._id": new mongoose.Types.ObjectId(id),
          },
        },
        {
          // returns only message(s)
          $replaceWith: "$categoryItem.itemProducts",
        },
      ]);
      console.log(product);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send("Internal server error");
      console.log(error);
    }
  }
});

app.post("/buyNow", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const postData = req.body;
  console.log(postData);
  try {
    const createOrderDoc = await OrderModel.create({
      userId: postData.userId,
      products: [
        {
          productId: postData.productId,
          productQuantity: postData.productQuantity,
        },
      ],
    });
    res.status(200).send("Successfully Placed Order");
    console.log(createOrderDoc);
  } catch (err) {
    console.log("Order Creation Failed");
    return res.status(400).send("Unable to Process Request");
  }
});

app.post("/getdriverdetailsfromemail", async (req, res) => {
  await mongoose.connect(MONGO_URL);
  const email = req.body.email;
  // console.log(email);
  try {
    const DriverData = await DriverModel.findOne({ email: email });
    let sendData = {
      name: DriverData.name,
      email: DriverData.email,
      phone: DriverData.phoneNumber,
      address: DriverData.address,
      vehiclenumber: DriverData.VehicleNumber,
      dlNumber: DriverData.drivingLicenseNumber,
    };
    // console.log(sendData);
    res.status(200).json(sendData);
  } catch (error) {
    console.log("server Error in get drivers details from email");
    res.status(500).json("Internal Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
