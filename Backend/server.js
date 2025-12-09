import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const app = express();

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======== MongoDB Setup =========
const uri = "mongodb+srv://kanimozhvenkatesan:kanivenkat@cluster0.sclpbdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("🌟 MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}
connectDB();

// ======== Middleware =========
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));  // serve images & assets

// ======== Routes ==========

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve about.html
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Serve db.json (static)
app.get("/api", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "db.json"));
});

// Fetch data from MongoDB (Weather Collection)
app.get("/api/weather", async (req, res) => {
    try {
        const cursor = client
            .db("Weatherdashboard")
            .collection("Weather")
            .find({});

        const results = await cursor.toArray();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching weather data" });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// ======== Start Server =========
app.listen(3200, () => {
    console.log("🚀 Server started on http://localhost:3200");
});
