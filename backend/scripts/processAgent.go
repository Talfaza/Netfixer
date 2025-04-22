package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
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

	// JSON output in terminal
	jsonOutput, err := json.MarshalIndent(output, "", "  ")
	if err != nil {
		log.Printf("Error marshaling JSON: %v", err)
		return
	}
	fmt.Println(string(jsonOutput))

	// Save JSON to file
	saveJSON(string(jsonOutput))

	// Save CSV to file
	saveCSV(output)

	// Summary print
	printSummary(output)
}

func saveJSON(jsonStr string) {
	jsonFile, err := os.OpenFile("process_data.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err == nil {
		defer jsonFile.Close()
		jsonFile.WriteString(jsonStr + "\n")
	} else {
		log.Printf("Error writing JSON to file: %v", err)
	}
}

func saveCSV(output ProcessOutput) {
	fileExists := true
	if _, err := os.Stat("process_data.csv"); os.IsNotExist(err) {
		fileExists = false
	}

	csvFile, err := os.OpenFile("process_data.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Printf("Error opening CSV file: %v", err)
		return
	}
	defer csvFile.Close()

	writer := csv.NewWriter(csvFile)
	defer writer.Flush()

	// Write headers if new file
	if !fileExists {
		writer.Write([]string{"Timestamp", "PID", "Name", "CPU%", "MemoryMB", "User", "Command"})
	}

	for _, p := range output.Processes {
		record := []string{
			strconv.FormatInt(output.Timestamp, 10),
			strconv.FormatInt(int64(p.PID), 10),
			p.Name,
			fmt.Sprintf("%.2f", p.CPU),
			fmt.Sprintf("%.2f", p.MemoryMB),
			p.User,
			p.Command,
		}
		writer.Write(record)
	}
}

func printSummary(output ProcessOutput) {
	fmt.Printf("\n[Timestamp: %d] Collected %d processes.\n", output.Timestamp, len(output.Processes))

	// Sort top 5 by CPU usage
	sort.Slice(output.Processes, func(i, j int) bool {
		return output.Processes[i].CPU > output.Processes[j].CPU
	})

	fmt.Println("Top 5 by CPU:")
	limit := 5
	if len(output.Processes) < 5 {
		limit = len(output.Processes)
	}
	for i := 0; i < limit; i++ {
		p := output.Processes[i]
		fmt.Printf("- %s (PID %d): %.2f%%\n", p.Name, p.PID, p.CPU)
	}
	fmt.Println()
}
