#!/bin/bash

OS_NAME=$(cat /etc/os-release | grep "^PRETTY_NAME=" | cut -d= -f2 | tr -d '"')

