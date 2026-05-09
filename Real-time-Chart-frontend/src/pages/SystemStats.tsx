import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type SystemStatsProp = {
    socket: Socket
}

type Stats = {
    cpu: number,
    ram: number
}

type ChartDataType = {
    time: string,
    cpu: number,
    ram: number
}

export default function SystemStats({socket}: SystemStatsProp) {
    const [chartData, setChartData] = useState<ChartDataType[]>([]);
    
        useEffect(() => {
            socket.on("systemStats", (data: Stats) => {
                const now = new Date();
                const seconds = now.getSeconds();
                const time = now.getMinutes() + ":" + (seconds > 9 ? seconds : `0${seconds}`); 
                const cpu = data.cpu;
                const ram = data.ram;
                setChartData(prev => [...prev.slice(-19), { time, ram, cpu }]);
            });
    
            return () => {
                socket.off("systemStats");
            }
        }, []);
    
        const latest = chartData[chartData.length - 1];
    
    return <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            CPU Usage
                        </h2>
    
                        <span className="text-3xl font-mono text-green-400">
                            {latest?.cpu.toFixed(1) ?? 0}%
                        </span>
                    </div>
    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <XAxis dataKey="time" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
    
                                <Line
                                    type="monotone"
                                    dataKey="cpu"
                                    stroke="#4ade80"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
    
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            RAM Usage
                        </h2>
    
                        <span className="text-3xl font-mono text-sky-400">
                            {latest?.ram.toFixed(1) ?? 0}%
                        </span>
                    </div>
    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <XAxis dataKey="time" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
    
                                <Line
                                    type="monotone"
                                    dataKey="ram"
                                    stroke="#38bdf8"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
    
            </div>
        </div>
}