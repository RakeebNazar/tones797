var express = require("express");
var app = express();

var cors = require("cors");

var app = express();
var mediaserver = require("mediaserver");
app.use(cors());
app.options("*", cors());

//middlewares
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

var songArray = [
  "Bird_Ring.mp3",
  "Blooming_Track.mp3",
  "Book_In.mp3",
  "Brows.mp3",
  "Door_Slowmo.mp3",
  "German_Alert.mp3",
  "Happiness.mp3",
  "Non_Stop_Ring.mp3",
  "Ring_Me.mp3",
  "Short_Sweet.mp3",
  "Slow_Morning.mp3",
  "Sms_Alert2.mp3",
  "Sms_Short.mp3",
  "Super_Mario.mp3",
  "Telephone_Ring.mp3",
  "Tik_Tik.mp3",
];

var finalArray = [];
var tempArray = [];
var UniqueRandomNum = function (limit, howMany) {
  let array = [];
  for (let i = 1; i <= limit; i++) {
    array.push(i);
  }

  let res = [];

  for (let i = 1; i <= howMany; i++) {
    const rand = Math.floor(Math.random() * (limit - i));
    res.push(array[rand]);
    array[rand] = array[limit - i];
  }

  res.forEach(function (e, index) {
    finalArray.push(songArray[e - 1]);
  });
  tempArray = finalArray;
  finalArray = [];
  return;
};

app.get("/tones", function (req, res) {
  var tones = [];
  UniqueRandomNum(songArray.length, 10);
  tones = tempArray;
  tones.splice(0, 10 - req.query.tones);
  tempArray = [];

  if (req.query.tones > 10) {
    res.status(401).json({
      status: "error",
      message: "Maximum Tones can be retrieved are 10",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        tones,
      },
    });
  }
});

app.get("/stream/:tone", (req, res) => {
  var filePath = `public/tones/${req.params.tone}`;
  mediaserver.pipe(req, res, filePath);
});

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/97techRingtones.html`);
});

app.get("/about", function (req, res) {
  console.log(`${__dirname}/public/html/About.html`);
  res.sendFile(`${__dirname}/public/html/About.html`);
});

app.get("/faq", function (req, res) {
  res.sendFile(`${__dirname}/public/html/FAQ.html`);
});
app.get("/privacy-policy", function (req, res) {
  res.sendFile(`${__dirname}/public/html/PrivacyPolicy.html`);
});
app.get("/contact", function (req, res) {
  res.sendFile(`${__dirname}/public/html/Contact.html`);
});
app.post("/contact", function (req, res) {
  res.redirect("/");
});

app.get("*", function (req, res) {
  res.sendFile(`${__dirname}/public/97techRingtones.html`);
});

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Successfully Running the Server");
});
