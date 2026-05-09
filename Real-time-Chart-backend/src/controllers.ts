import { DefaultEventsMap, Socket } from "socket.io";
import sysInf from "systeminformation";

export async function connectionController(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    const interval = setInterval(async() => {
        const cpu = await sysInf.currentLoad();
        const ram = await sysInf.mem(); 
        const network = await sysInf.networkStats();
        const os = await sysInf.osInfo();

        socket.emit("systemStats", { 
            cpu: cpu.currentLoad,
            ram: (ram.used / ram.total) * 100 
        });

        socket.emit("networkStats", {
            download: network[0].rx_sec,
            upload: network[0].tx_sec
        });

        socket.emit("osStats", {
            platform: os.platform,
            distro: os.distro,
            release: os.release,
            kernel: os.kernel,
            hostname: os.hostname,
            arch: os.arch
        })
    }, (1000));

    socket.on("disconnect", () => {
        clearInterval(interval);
    });
}
 