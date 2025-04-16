package main

import (
	"log"

	"github.com/Netfixer/auth-service/database"
	"github.com/Netfixer/auth-service/service"
	"github.com/gofiber/fiber/v3"
)

func main() {

	if err := database.ConnectDatabase(); err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	app := fiber.New()

	authService := service.NewAuthService()

	api := app.Group("/api")

	auth := api.Group("/auth")
	auth.Post("/register", authService.Register)
	auth.Post("/login", authService.Login)
	auth.Post("/logout", authService.Logout)

	log.Printf("Server is running on port 8080")
	log.Fatal(app.Listen(":8080"))
}
