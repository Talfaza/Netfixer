package main

import (
	"fmt"
	"log"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
	"github.com/shirou/gopsutil/v4/process"
)

func main() {
	// Set the interval duration
	interval := 10 * time.Second // Adjust this value as needed

	// Create a new ticker
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	// Initial run
	collectAndDisplayMetrics()

	// Run the monitoring function at each tick
	for range ticker.C {
		collectAndDisplayMetrics()
	}
}

func collectAndDisplayMetrics() {
	fmt.Println("Collecting metrics at:", time.Now().Format(time.RFC1123))

	// Retrieve all processes
	processes, err := process.Processes()
	if err != nil {
		log.Printf("Error retrieving processes: %v", err)
		return
	}

	fmt.Println("\nProcess Information:")
	for _, proc := range processes {
		pid := proc.Pid

		name, err := proc.Name()
		if err != nil {
			name = "N/A"
		}

		cpuPercent, err := proc.CPUPercent()
		if err != nil {
			cpuPercent = 0.0
		}

		memInfo, err := proc.MemoryInfo()
		var memUsageMB float64
		if err == nil {
			memUsageMB = float64(memInfo.RSS) / (1024 * 1024)
		} else {
			memUsageMB = 0.0
		}

		cmdline, err := proc.Cmdline()
		if err != nil {
			cmdline = "N/A"
		}

		username, err := proc.Username()
		if err != nil {
			username = "N/A"
		}

		fmt.Printf("PID: %d \n Name: %s \n CPU: %.2f%% \n Memory: %.2f MB \n User: %s \n Command: %s\n",
			pid, name, cpuPercent, memUsageMB, username, cmdline)
	}

	// Retrieve system metrics
	fmt.Println("\nSystem Metrics:")

	// CPU usage
	cpuPercents, err := cpu.Percent(0, false)
	if err != nil {
		log.Printf("Error retrieving CPU percent: %v", err)
	} else if len(cpuPercents) > 0 {
		fmt.Printf("CPU Usage: %.2f%%\n", cpuPercents[0])
	}

	// Memory usage
	vmStat, err := mem.VirtualMemory()
	if err != nil {
		log.Printf("Error retrieving virtual memory: %v", err)
	} else {
		fmt.Printf("Memory Usage: %.2f%%\n", vmStat.UsedPercent)
		fmt.Printf("Total Memory: %.2f GB\n", float64(vmStat.Total)/(1024*1024*1024))
	}

	// Disk usage
	diskStat, err := disk.Usage("/")
	if err != nil {
		log.Printf("Error retrieving disk usage: %v", err)
	} else {
		fmt.Printf("Disk Usage: %.2f%%\n", diskStat.UsedPercent)
	}

	// Network I/O
	netIO, err := net.IOCounters(false)
	if err != nil {
		log.Printf("Error retrieving network I/O counters: %v", err)
	} else if len(netIO) > 0 {
		fmt.Printf("Network - Sent: %.2f MB, Received: %.2f MB\n",
			float64(netIO[0].BytesSent)/(1024*1024),
			float64(netIO[0].BytesRecv)/(1024*1024))
	}

	fmt.Println("----------------------------------------------------")
}
