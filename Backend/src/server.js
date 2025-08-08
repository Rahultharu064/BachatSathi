import dotenv from "dotenv";
import app from "./app.js";
import { initializeDatabase } from "./controllers/authController.js";
import { closeDatabase } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
