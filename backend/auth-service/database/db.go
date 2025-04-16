package database

import (
	"fmt"
	"log"
	"os"

	"github.com/Netfixer/auth-service/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("AUTH_DB_USER"),
		os.Getenv("AUTH_DB_PASSWORD"),
		os.Getenv("AUTH_DB_HOST"),
		os.Getenv("AUTH_DB_NAME"),
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %v", err)
	}

	DB = db
	log.Println("Database connected successfully!")

	if err := DB.AutoMigrate(&models.User{}); err != nil {
		return fmt.Errorf("failed to migrate database: %v", err)
	}

	return nil
}
