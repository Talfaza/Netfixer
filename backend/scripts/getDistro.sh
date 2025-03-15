#!/usr/bin/env bash

distro=$(cat /etc/os-release | grep "^PRETTY_NAME=" | cut -d= -f2 | tr -d '"')
