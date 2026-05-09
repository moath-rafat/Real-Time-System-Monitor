import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { formatBytes } from "../helpers/helpers";

type NetworkStatsProp = {
    socket: Socket
}

type Stats = {
    download: number,
    upload: number
}

type ChartDataType = {
    time: string,
    download: number,
    upload: number
}

export default function NetworkStats({socket}: NetworkStatsProp) {
    const [chartData, setChartData] = useState<ChartDataType[]>([]);
    
        useEffect(() => {
            socket.on("networkStats", (data: Stats) => {
                const now = new Date();
                const seconds = now.getSeconds();
                const time = now.getMinutes() + ":" + (seconds > 9 ? seconds : `0${seconds}`); 
                const download = data.download;
                const upload = data.upload;
                setChartData(prev => [...prev.slice(-19), { time, upload, download }]);
            });
    
            return () => {
                socket.off("networkStats");
            }
        }, []);
    
        const latest = chartData[chartData.length - 1];
    
    return <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            Download Speed
                        </h2>
    
                        <span className="text-3xl font-mono text-green-400">
                            {formatBytes(latest?.download ?? 0)}
                        </span>
                    </div>
    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <XAxis dataKey="time" />
                                <Tooltip />
    
                                <Line
                                    type="monotone"
                                    dataKey="download"
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
                            Upload Speed
                        </h2>
    
                        <span className="text-3xl font-mono text-sky-400">
                            {formatBytes(latest?.upload?? 0)}
                        </span>
                    </div>
    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <XAxis dataKey="time" />
                                <Tooltip />
    
                                <Line
                                    type="monotone"
                                    dataKey="upload"
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