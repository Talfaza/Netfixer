package routes

import (
	"github.com/Talfaza/Netfixer/microservices"
	"github.com/gofiber/fiber/v3"
)

func RouteSetup(app *fiber.App) {
    app.Post("/api/execute", microservices.ExecuteCommand)
}
