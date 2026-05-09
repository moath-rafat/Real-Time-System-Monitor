import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import SystemStats from "./pages/SystemStats";
import NetworkStats from "./pages/NetworkStats";
import OsStats from "./pages/OsStats";
import Navbar from "./helpers/Navbar";

const socket = io("http://localhost:8080");  

export default function App() {
    return <BrowserRouter> 
    <Navbar />
    <Routes>
        <Route path="/" element={<Navigate replace to="system-stats"/>} />
        <Route path="/system-stats" element={<SystemStats socket={socket}/>}/>
        <Route path="/network-stats" element={<NetworkStats socket={socket}/>}/>
        <Route path="/os-stats" element={<OsStats socket={socket}/>}/>
        </Routes>
    </BrowserRouter>
}