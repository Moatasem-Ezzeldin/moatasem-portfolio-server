process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION 💥", err);
    process.exit(1);
});

const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const dbConnection = require("./config/database");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares");

dotenv.config({ path: ".env" });

dbConnection();

const app = express();

app.use(express.json());

app.use(helmet());
app.set("trust proxy", 1);
app.use(hpp());
app.set("query parser", "extended");

app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
    })
);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Routes will be added here

app.use((req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}, 404`));
});

app.use(globalError);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.error(`UNHANDLED REJECTION ⚠️ ${err.name}: ${err.message}`);
    console.error("Error stack:", err.stack);

    server.close(() => {
        console.log("Server shutting down...");
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");

    server.close(() => {
        console.log("Process terminated");
        process.exit(0);
    });
});