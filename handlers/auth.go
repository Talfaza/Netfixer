package handlers

import (
	"encoding/json"
	"net/http"
	"golang.org/x/crypto/bcrypt"
	"back/models"
	"back/utils"
)

var users = []models.User{}
var userIDCounter = 1

func Register(w http.ResponseWriter, r *http.Request) {
	var input models.User
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Check for duplicate email
	for _, u := range users {
		if u.Email == input.Email {
			http.Error(w, "Email already exists", http.StatusBadRequest)
			return
		}
	}

	if input.Role != "admin" && input.Role != "user" {
		input.Role = "user"
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	input.Password = string(hashedPassword)
	input.ID = userIDCounter
	userIDCounter++

	users = append(users, input)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var user models.User
	for _, u := range users {
		if u.Email == input.Email {
			user = u
			break
		}
	}

	if user.Email == "" {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateJWT(user.Email, user.Role)
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}

func Me(w http.ResponseWriter, r *http.Request) {
	email := r.Context().Value("email").(string)

	for _, user := range users {
		if user.Email == email {
			json.NewEncoder(w).Encode(map[string]interface{}{
				"id":         user.ID,
				"first_name": user.FirstName,
				"last_name":  user.LastName,
				"email":      user.Email,
				"phone":      user.Phone,
				"role":       user.Role,
			})
			return
		}
	}

	http.Error(w, "User not found", http.StatusNotFound)
}
