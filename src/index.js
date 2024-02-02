import connect from "./db/index.js";
import dotenv, { config } from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connect()
  .then(() => {
    app.listen(process.env.PORT || 6000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
    app.on("error", () => {
      console.log(`Server failed: ${error}`);
    });
  })
  .catch((err) => console.log(`MongoDB connection failer ${err}`));

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.error("Express error: ", err);
//       throw err;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log("Hosted on");
//     });
//   } catch (error) {
//     console.error("ERROR: ", error);
//     throw error;
//   }
// })();
