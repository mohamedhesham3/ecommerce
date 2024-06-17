const express = require("express");
const connection = require("./configs/mongoose");
const router = require("./routes/Routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const { saveProdcut } = require('./controllers/UploadProduct');

const app = express();
const port = process.env.PORT;

connection();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Define the origin for CORS
const allowedOrigins = [
  'https://66703ed59fe41515e322438b--steady-centaur-9fdbd1.netlify.app',

];

// CORS setup for regular HTTP routes
app.use(cors({
  origin: function(origin, callback) {
    // Check if the origin is in the allowedOrigins array, or if it's undefined (e.g., non-browser requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// Ensure you call saveProdcut(io) after io is configured
saveProdcut(io);

app.use("/", router);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
