import app from "./app";
import { connectDB } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";

const PORT=ENV_CONFIG.PORT;
const DB_URI=ENV_CONFIG.DB_URI;

connectDB(DB_URI);
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});