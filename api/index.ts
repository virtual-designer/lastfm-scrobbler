import { config } from "dotenv";
import express from "express";
import path from "path";
import router from "./router";

config({
    path: path.resolve(__dirname, ".."),
});

const app = express();

app.use(router);

app.listen(process.env.PORT ?? 5500, () => console.log("Server is ready!"));
