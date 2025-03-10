package routes

import (
    "github.com/gofiber/fiber/v3"
    "github.com/Talfaza/Netfixer/microservices"
)

func RouteSetup(app *fiber.App) {
    app.Post("/api/execute", microservices.ExecuteCommand)
}
