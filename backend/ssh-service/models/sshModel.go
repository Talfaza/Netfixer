package models

type SSHConfig struct {
    Username string `json:"username"`
    Password string `json:"password"`
    Host     string `json:"host"`
    Port     string `json:"port"`
}

type SSHRequest struct {
    Username string `json:"username"`
    Password string `json:"password"`
    Host     string `json:"host"`
    Port     string `json:"port"`
    Command  string `json:"command"`
}
