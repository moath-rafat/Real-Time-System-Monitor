import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type OsStatsProp = {
    socket: Socket;
};

type OsData = {
    platform: string;
    distro: string;
    release: string;
    kernel: string;
    hostname: string;
    arch: string;
};

export default function OsStats({ socket }: OsStatsProp) {
    const [osData, setOsData] = useState<OsData | null>(null);

    useEffect(() => {
        function handleOsStats(data: OsData) {
            setOsData(data);
        }

        socket.on("osStats", handleOsStats);

        return () => {
            socket.off("osStats", handleOsStats);
        };
    }, [socket]);

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">
                Operating System
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <InfoCard
                    label="Platform"
                    value={osData?.platform}
                />

                <InfoCard
                    label="Distribution"
                    value={osData?.distro}
                />

                <InfoCard
                    label="Release"
                    value={osData?.release}
                />

                <InfoCard
                    label="Kernel"
                    value={osData?.kernel}
                />

                <InfoCard
                    label="Hostname"
                    value={osData?.hostname}
                />

                <InfoCard
                    label="Architecture"
                    value={osData?.arch}
                />

            </div>
        </div>
    );
}

type InfoCardProps = {
    label: string;
    value?: string;
};

function InfoCard({ label,value }: InfoCardProps) {
    return <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800">
            <h2 className="text-sm text-zinc-400 mb-2">
                {label}
            </h2>

            <p className="text-xl font-mono break-all">
                {value ?? "Loading..."}
            </p>
        </div>
}