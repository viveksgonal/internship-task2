const asyncHandler = require("express-async-handler");
const info = require("../models/info");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENT_ID =
  "1028838742210-e73er02trav07d59rt1e1e3rk31qbafi.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04VF_7fPjI5icCgYIARAAGAQSNwF-L9IrLDGGjwLE2RkUHOQ-Ib3V75aKsg4wY7oIQ2ljnYyAUECknz3fS_vBHXNKQj9PEibWSsg";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const addData = asyncHandler(async (req, res) => {
  const { name, phoneno, email, hobbies } = req.body;
  const data = await info.create({
    name,
    phoneno,
    email,
    hobbies,
  });
  if (data) {
    res.json({
      _id: data._id,
      name: data.name,
      phoneno: data.phoneno,
      email: data.email,
      hobbies: data.hobbies,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const delData = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const data = await info.deleteOne({ _id: id });
  if (data) {
    res.json(data);
  } else {
    res.status(400);
  }
});

const getData = asyncHandler(async (req, res) => {
  // const {id} = req.body;
  const data = await info.find({});
  if (data) {
    res.json(data);
  } else {
    res.status(400);
  }
});

const getCount = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const data = await info.countDocuments({ _id: id });
  res.json(data);
});
const getCount2 = asyncHandler(async (req, res) => {
  const { id2 } = req.body;
  const data = await info.countDocuments({ _id: id2 });
  res.json(data);
});
const updateData = asyncHandler(async (req, res) => {
  const { id2, name2, phoneno2, email2, hobbies2 } = req.body;
  const data = await info.findByIdAndUpdate(
    id2,
    {
      $set: {
        name: name2,
        phoneno: phoneno2,
        email: email2,
        hobbies: hobbies2,
      },
    },
    { new: true, useFindAndModify: false }
  );
  if (data) {
    res.json(data);
  } else {
    res.status(400);
  }
});

const mailData =  asyncHandler(async (req, res) => {
    const {flatrows} = req.body;
    const accessToken = await oAuth2Client.getAccessToken();
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        type: "OAUTH2",
        user: "projectvg123@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  
    var mailOptions = {
      from: "projectvg123@gmail.com",
      to: "info@redpositive.in",
      subject: "Sending Email using Internship Task Application",
      text: flatrows
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json(error);
      } else {
        res.json(info.response);
      }
    });
  });
module.exports = {
  addData,
  delData,
  getData,
  updateData,
  getCount,
  getCount2,
  mailData,
};
