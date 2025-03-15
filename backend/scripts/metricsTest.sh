#!/usr/bin/env bash

cpu=$(mpstat 1 1 | awk '/Average:/ {printf "{\"user\":%.2f, \"system\":%.2f, \"idle\":%.2f}", $3, $5, $7}')

memory=$(free -m | awk '/Mem:/ {printf "{\"total\":%d, \"used\":%d, \"free\":%d}", $2, $3, $4}')

disk=$(df -h / | awk 'NR==2 {printf "{\"total\":\"%s\", \"used\":\"%s\", \"free\":\"%s\"}", $2, $3, $4}')

echo "{ \"cpu\": $cpu, \"memory\": $memory, \"disk\": $disk   }" | jq .
