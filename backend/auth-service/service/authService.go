// auth_service.go
package service

import (
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/Netfixer/auth-service/database"
	"github.com/Netfixer/auth-service/models"
	"github.com/Netfixer/auth-service/utils"
	"github.com/gofiber/fiber/v3"
)

const (
	bcryptCost   = 14
	cookieExpiry = 24 * time.Hour
	emailRegex   = `(?i)^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`
)

type AuthService struct {
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (s *AuthService) Register(c fiber.Ctx) error {
	var req struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request format",
		})
	}

	// Normalize and validate email
	email := strings.ToLower(strings.TrimSpace(req.Email))
	if !regexp.MustCompile(emailRegex).MatchString(email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid email address",
		})
	}

	// Check existing user
	var existing models.User
	if result := database.DB.Where("email = ?", email).First(&existing); result.Error == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "Email already registered",
		})
	}

	// Create user
	user := models.User{
		Username: strings.TrimSpace(req.Username),
		Email:    email,
	}

	if err := user.HashPassword(req.Password); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not process password",
		})
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not create user",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Registration successful",
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

func (s *AuthService) Login(c fiber.Ctx) error {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request format",
		})
	}

	// Find user
	var user models.User
	email := strings.ToLower(strings.TrimSpace(req.Email))
	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Verify password
	if err := user.ComparePassword(req.Password); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Generate JWT
	token, err := utils.GenerateJWT(fmt.Sprintf("%d", user.ID))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not generate access token",
		})
	}

	// Set cookie
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(cookieExpiry),
		SameSite: fiber.CookieSameSiteStrictMode,
		Secure:   true,
		HTTPOnly: true,
	})

	return c.JSON(fiber.Map{
		"message": "Login successful",
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

func (s *AuthService) Logout(c fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		SameSite: fiber.CookieSameSiteStrictMode,
		Secure:   true,
		HTTPOnly: true,
	})

	return c.JSON(fiber.Map{
		"message": "Successfully logged out",
	})
}
