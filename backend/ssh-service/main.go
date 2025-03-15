package main

import (
	"github.com/gofiber/fiber/v3"
  "github.com/Netfixer/ssh-service/service"
)

func main() {
	app := fiber.New()

	// Define route for SSH command execution
	app.Post("/api/execute", services.ExecuteCommand)

	// Start the server
	app.Listen(":3000")
}
