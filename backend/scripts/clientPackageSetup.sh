#!/usr/bin/env bash



distro=$(cat /etc/os-release | grep "^ID=" | cut -d= -f2 | tr -d '"')

case "$distro" in
    ubuntu|debian|proxmox)
        sudo apt update && sudo apt install -y openssh-server glances grep curl
        sudo apt install -y openssh-client libc6 libssl3 zlib1g libwrap0 libpam0g libselinux1 libsystemd0
        ;;
    rhel|centos|fedora|almalinux|rocky|oraclelinux)
        sudo dnf install -y openssh-server glances grep curl
        sudo dnf install -y openssh-clients glibc openssl-libs libselinux libsystemd libz pam
        ;;
    opensuse|sles)
        sudo zypper install -y openssh-server glances grep curl
        sudo zypper install -y openssh-clients glibc libopenssl3 pam libwrap0 libsystemd0 libselinux1
        ;;
    *)
    echo "Unsupported Refer To The Admin: $distro"
        exit 1
        ;;
esac

#echo "Installation complete for $distro!"
