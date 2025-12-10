import dotenv from 'dotenv';

dotenv.config();

console.log("ENV TEST ACCESS:", process.env.JWT_ACCESS_SECRET_KEY);
console.log("ENV TEST REFRESH:", process.env.JWT_REFRESH_SECRET_KEY);

import app from "./app.js"; // for build output
import { connectDB } from "./config/db.js";



const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
