package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/mem"
)

type SystemMetrics struct {
	Timestamp      int64   `json:"timestamp"`
	CPUUsage       float64 `json:"cpu_usage_percent"`
	MemoryUsage    float64 `json:"memory_usage_percent"`
	TotalMemoryGB  float64 `json:"total_memory_gb"`
	DiskUsage      float64 `json:"disk_usage_percent"`
}

func main() {
	interval := 5 * time.Second
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	collectAndDisplaySystemMetrics()
	for range ticker.C {
		collectAndDisplaySystemMetrics()
	}
}

func collectAndDisplaySystemMetrics() {
	var metrics SystemMetrics
	metrics.Timestamp = time.Now().Unix()

	if cpuPercents, err := cpu.Percent(0, false); err == nil && len(cpuPercents) > 0 {
		metrics.CPUUsage = cpuPercents[0]
	} else {
		log.Printf("Error retrieving CPU percent: %v", err)
	}

	if vmStat, err := mem.VirtualMemory(); err == nil {
		metrics.MemoryUsage = vmStat.UsedPercent
		metrics.TotalMemoryGB = float64(vmStat.Total) / (1024 * 1024 * 1024)
	} else {
		log.Printf("Error retrieving memory info: %v", err)
	}

	if diskStat, err := disk.Usage("/"); err == nil {
		metrics.DiskUsage = diskStat.UsedPercent
	} else {
		log.Printf("Error retrieving disk usage: %v", err)
	}

	jsonOutput, err := json.MarshalIndent(metrics, "", "  ")
	if err != nil {
		log.Printf("Error marshaling JSON: %v", err)
		return
	}
	fmt.Println(string(jsonOutput))
}
