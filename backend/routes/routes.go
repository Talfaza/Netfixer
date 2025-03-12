package routes

import (
	microservices "github.com/Talfaza/Netfixer/microservices/sshService"
	"github.com/gofiber/fiber/v3"
)

func RouteSetup(app *fiber.App) {
	app.Post("/api/execute", microservices.ExecuteCommand)
}
