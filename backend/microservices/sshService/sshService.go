package microservices 

import (
    "fmt"
    "github.com/Talfaza/Netfixer/models"
    "github.com/gofiber/fiber/v3"
    "golang.org/x/crypto/ssh"
)

func ConnectAndExecute(config models.SSHConfig, command string) (string, error) {
    sshConfig := &ssh.ClientConfig{
        User: config.Username,
        Auth: []ssh.AuthMethod{
            ssh.Password(config.Password),
        },
        HostKeyCallback: ssh.InsecureIgnoreHostKey(),
    }

    client, err := ssh.Dial("tcp", fmt.Sprintf("%s:%s", config.Host, config.Port), sshConfig)
    if err != nil {
        return "", fmt.Errorf("failed to dial: %v", err)
    }
    defer client.Close()

    session, err := client.NewSession()
    if err != nil {
        return "", fmt.Errorf("failed to create session: %v", err)
    }
    defer session.Close()

    output, err := session.CombinedOutput(command)
    if err != nil {
        return "", fmt.Errorf("failed to run command: %v", err)
    }

    return string(output), nil
}

func ExecuteCommand(c fiber.Ctx) error {
    var req models.SSHRequest

    if err := c.Bind().Body(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid request payload",
        })
    }

    config := models.SSHConfig{
        Username: req.Username,
        Password: req.Password,
        Host:     req.Host,
        Port:     req.Port,
    }

    output, err := ConnectAndExecute(config, req.Command)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": fmt.Sprintf("Error executing command: %v", err),
        })
    }

    return c.JSON(fiber.Map{
        "output": output,
    })
}
