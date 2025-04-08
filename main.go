package main

import (
	"encoding/json"
	"log"
	"net/http"
	"github.com/rs/cors"
	"back/utils" // Ensure the path to your utils package is correct
)

// Struct for login form
type LoginForm struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Struct for registration form
type RegisterForm struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`
	Role      string `json:"role"`
}

// Registration handler
func Register(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var form RegisterForm
		err := json.NewDecoder(r.Body).Decode(&form)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// Simulate registration process
		log.Printf("User registered: %v", form)
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Registration successful"})
	} else {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
	}
}

// Login handler
func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var form LoginForm
		err := json.NewDecoder(r.Body).Decode(&form)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// Simulate login process: You would validate the user's credentials here
		// For this example, assume the credentials are always valid.
		log.Printf("User login attempt: %v", form)
		
		// Generate JWT token
		token, err := utils.GenerateJWT(form.Email, "user") // You can dynamically set role based on user
		if err != nil {
			http.Error(w, "Failed to generate token", http.StatusInternalServerError)
			return
		}

		// Send token in the response
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Login successful",
			"token":   token,
		})
	} else {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
	}
}

func main() {
	// Register the /register and /login routes
	http.HandleFunc("/register", Register)
	http.HandleFunc("/login", Login)

	// Enable CORS for all origins
	handler := cors.Default().Handler(http.DefaultServeMux)

	log.Println("Server started on http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", handler)) // Start server on port 8000
}
