package main

import (
	"log"

	"github.com/Netfixer/ssh-service/database"
	services "github.com/Netfixer/ssh-service/service"
	"github.com/gofiber/fiber/v3"
)

func main() {
	database.ConnectDatabase()

	app := fiber.New()

	app.Post("/execute", services.ExecuteCommand)

	log.Println("Server running on port 8080")
	log.Fatal(app.Listen(":8080"))
}
