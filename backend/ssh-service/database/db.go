package database

import (
	"fmt"
	"log"
	"os"

	"github.com/Netfixer/ssh-service/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("SSH_DB_USER"),
		os.Getenv("SSH_DB_PASSWORD"),
		os.Getenv("SSH_DB_HOST"),
		os.Getenv("SSH_DB_NAME"),
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	DB = db
	log.Println("Database connected successfully!")

	if err := DB.AutoMigrate(&models.SSHConfig{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
}
