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
const port = process.env.PORT || 3000;

connection();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup for regular HTTP routes
app.use(cors({
  origin: 'https://ecommerce-s5sw-dj6rysdqy-mohamedds-projects.vercel.app',
  credentials: true,
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://ecommerce-s5sw-dj6rysdqy-mohamedds-projects.vercel.app',
    methods: ["GET", "POST"]
  }
});

// Ensure you call saveProdcut(io) after io is configured
saveProdcut(io);

app.use("/", router);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
