import app from "./app";
import { initDB } from "./config/sequelize";

const PORT = process.env.PORT || 8080;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    });
});