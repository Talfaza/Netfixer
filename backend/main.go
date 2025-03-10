package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")

	app := fiber.New()

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Backend Server On Port : " + port)
	})

	log.Fatal(app.Listen(":" + port))
	if err != nil {
		log.Fatal("Error Starting Server....")
	}
}
