import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Needed for ES modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve portfolio (optional)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ====== MongoDB ======
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Add it in Render Environment Variables");
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema
const weatherSchema = new mongoose.Schema({
  id: Number,
  location: String,
  temperature: Number,
  weatherCondition: String,
  forecast: String,
});

const Weather = mongoose.model("Weather", weatherSchema);

// API endpoint
app.get("/api", async (req, res) => {
  try {
    const data = await Weather.find();
    res.json({ weather: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ====== PORT (REQUIRED FOR RENDER) ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on Render port ${PORT}`)
);
