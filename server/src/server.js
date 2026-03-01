import "dotenv/config";
import app from "./app.js";
import { ConnectDB } from "./config/connectDB.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await ConnectDB();
        app.listen(PORT, () => {
            console.log("Server running on Port:", PORT);
        });
    } catch (err) {
        console.error(err);
    }
}
startServer();