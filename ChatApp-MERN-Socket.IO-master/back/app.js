const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Setup Cross Origin
app.use(cors());

//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));
app.use("/message", require("./routes/messages"));
app.use("/diary", require("./routes/diaryRoute"));

//Setup Error Handlers
// const errorHandlers = require("./handlers/errorHandlers");
// app.use(errorHandlers.notFound);
// app.use(errorHandlers.mongoseErrors);
// if (process.env.ENV === "DEVELOPMENT") {
//   app.use(errorHandlers.developmentErrors);
// } else {
//   app.use(errorHandlers.productionErrors);
// }

module.exports = app;
