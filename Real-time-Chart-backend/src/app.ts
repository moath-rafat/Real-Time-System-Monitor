import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { connectionController } from "./controllers";

const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(8080);
export const io = new Server(server, {
    cors: {origin: "*"}
});

io.on("connection", connectionController);