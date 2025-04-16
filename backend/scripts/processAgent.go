package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/shirou/gopsutil/v4/process"
)

type ProcessMetrics struct {
	PID      int32   `json:"pid"`
	Name     string  `json:"name"`
	CPU      float64 `json:"cpu_percent"`
	MemoryMB float64 `json:"memory_mb"`
	User     string  `json:"user"`
	Command  string  `json:"command"`
}

type ProcessOutput struct {
	Timestamp int64            `json:"timestamp"`
	Processes []ProcessMetrics `json:"processes"`
}

func main() {
	interval := 10 * time.Second
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	collectAndDisplayProcesses()
	for range ticker.C {
		collectAndDisplayProcesses()
	}
}

func collectAndDisplayProcesses() {
	var output ProcessOutput
	output.Timestamp = time.Now().Unix()

	processes, err := process.Processes()
	if err != nil {
		log.Printf("Error retrieving processes: %v", err)
		return
	}

	for _, proc := range processes {
		name, _ := proc.Name()
		cpuPercent, _ := proc.CPUPercent()
		memInfo, _ := proc.MemoryInfo()
		memUsageMB := float64(0)
		if memInfo != nil {
			memUsageMB = float64(memInfo.RSS) / (1024 * 1024)
		}
		cmdline, _ := proc.Cmdline()
		username, _ := proc.Username()

		p := ProcessMetrics{
			PID:      proc.Pid,
			Name:     name,
			CPU:      cpuPercent,
			MemoryMB: memUsageMB,
			User:     username,
			Command:  cmdline,
		}
		output.Processes = append(output.Processes, p)
	}

	jsonOutput, err := json.MarshalIndent(output, "", "  ")
	if err != nil {
		log.Printf("Error marshaling JSON: %v", err)
		return
	}
	fmt.Println(string(jsonOutput))
}
