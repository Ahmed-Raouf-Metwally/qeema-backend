require('dotenv').config();
console.log("--- DEBUGGING .ENV ---");
console.log("Loaded Keys:", Object.keys(process.env).filter(key => key.includes("DATA") || key.includes("URL")));
console.log("Is DATABASE_URL present?", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    console.log("DATABASE_URL length:", process.env.DATABASE_URL.length);
    console.log("First 5 chars:", process.env.DATABASE_URL.substring(0, 5));
}
console.log("--- END DEBUG ---");
