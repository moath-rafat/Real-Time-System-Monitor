import { NavLink } from "react-router-dom";

export default function Navbar() {
    return <div className="text-2xl font-bold bg-zinc-950 text-white p-8 pb-4 border-b border-b-gray-400">
        <h1 className="text-4xl mb-8 ">
            System Monitor
        </h1>

        <div className="flex justify-between">
            <NavLink to="/system-stats" className={({ isActive }) => {
                return isActive ? "bg-green-500 text-black" : "bg-zinc-900 text-white"
            }}>
                CPU and RAM Usage
            </NavLink>

            <NavLink to="/network-stats" className={({ isActive }) => {
                return isActive ? "bg-green-500 text-black" : "bg-zinc-900 text-white"
            }}>
                Network Stats
            </NavLink>

            <NavLink to="/os-stats" className={({ isActive }) => {
                return isActive ? "bg-green-500 text-black" : "bg-zinc-900 text-white"
            }}>
                Os Stats
            </NavLink>
        </div>
    </div>
}