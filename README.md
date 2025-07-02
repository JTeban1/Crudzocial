# Crudzocial - Social Media Platform

A modern web application built with vanilla JavaScript that provides user authentication, profile management, and social features including posts, images, and notes.

## 🚀 Features

- **User Authentication**
  - Secure user registration with email validation
  - Password hashing using SHA-256 encryption
  - Login/logout functionality
  - Session management with localStorage

- **User Management**
  - User profile creation and editing
  - Duplicate email prevention
  - Form validation and error handling

- **Social Features**
  - User logs and activity tracking
  - Image upload and management
  - Personal notes system
  - User profile customization

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.3.3
- **Security**: Web Crypto API for password hashing
- **Storage**: localStorage for data persistence
- **Architecture**: Modular ES6 modules

## 📁 Project Structure

```
Crudzocial/
├── README.md               # Project documentation
├── assets/
│   ├── js/
│   │   ├── auth.js         # Authentication logic
│   │   ├── register.js     # Registration form handling
│   │   ├── login.js        # Login form handling
│   │   ├── logout.js       # Logout functionality
│   │   ├── user_profile.js # Profile management
│   │   ├── notes.js        # Notes functionality
│   │   ├── img.js          # Image management
│   │   ├── logs.js         # Activity logging
│   │   └── logic_logs.js   # Logging utilities
├── css/
│   ├── style.css           # Main styles
│   ├── menu.css            # Menu styles
│   └── logs.css            # Activity logs styles
└── pages/
    ├── index.html              # Login page
    ├── register.html           # User registration page
    ├── notes.html              # Notes management
    ├── menu.html           # Main dashboard
    ├── user_profile.html   # User profile page
    ├── imgs.html           # Image gallery
    └── logs.html           # Activity logs
```

## 🚦 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (recommended for development)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Crudzocial
   ```

2. **Start a local server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using Live Server (VS Code extension)
   # Right-click on index.html → "Open with Live Server"
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Quick Start

1. Open `index.html` in your browser
2. Click "¿No tienes cuenta? ¡Regístrate aquí!" to create a new account
3. Fill out the registration form
4. Login with your credentials
5. Explore the dashboard and features

## 📋 Usage

### User Registration

The registration form (`register.html`) includes:

- **Personal Information**
  - First Name (required)
  - Last Name (required)
  - Email (required, must be unique)
  - Phone Number (optional)
  - Country (optional, letters only)
  - City (optional, letters only)

- **Security**
  - Password (required)
  - Confirm Password (required, must match)

#### Form Validation

- Email uniqueness validation
- Password confirmation matching
- Pattern validation for country/city fields
- Required field validation

### Authentication Flow

1. **Registration**: User fills form → Email validation → Password hashing → User saved
2. **Login**: Email/password input → Password hashing → Credential verification → Session creation
3. **Session Management**: localStorage tracks logged-in user
4. **Page Protection**: Unauthorized users redirected to login

## 🔒 Security Features

### Password Security
- **SHA-256 Hashing**: All passwords are hashed using the Web Crypto API
- **No Plain Text Storage**: Passwords are never stored in plain text
- **Secure Comparison**: Hashed passwords are compared during login

### Data Validation
- **Email Uniqueness**: Prevents duplicate accounts
- **Form Validation**: Client-side validation for better UX
- **Input Sanitization**: Pattern validation for text fields

### Session Management
- **localStorage Sessions**: User sessions stored locally
- **Page Protection**: Automatic redirect for unauthorized access
- **Activity Logging**: Track user actions and login events

## 🔧 Development

### Code Architecture

The application follows a **modular architecture** with separate concerns:

- **Authentication Module** (`auth.js`): Core authentication logic
- **Form Handlers**: Specific handlers for registration, login
- **Utility Modules**: Logging, validation, data management
- **Page Controllers**: Individual page logic and interactions

### Key Functions

#### Authentication (`auth.js`)
```javascript
getUsers()              // Retrieve users from localStorage
hashPassword(password)  // Hash password using SHA-256
saveUser(user)         // Save new user with validation
login(email, password) // Authenticate user credentials
isLoggedIn()          // Check current session status
protectPage()         // Redirect if not authenticated
```

#### Registration (`register.js`)
```javascript
handleRegistration(e)   // Main form submission handler
validatePasswords(form) // Ensure passwords match
createUserObject(form)  // Build user object from form data
registerUser(user)      // Complete registration process
```

### Asynchronous Operations

The application extensively uses **async/await** for:
- Password hashing operations
- User registration flow
- Login authentication
- Form submission handling

See [ASYNCHRONISM_AND_PROMISES.md](./ASYNCHRONISM_AND_PROMISES.md) for detailed technical documentation.

## 🎨 Styling

- **Bootstrap 5.3.3**: Modern, responsive framework
- **Custom CSS**: Additional styling for specific components
- **Responsive Design**: Mobile-friendly layouts
- **Modern UI**: Clean, professional appearance

### Color Scheme
- Primary: Bootstrap success green
- Background: Light gray (`bg-light`)
- Cards: White with subtle shadows
- Forms: Clean, minimal styling

## 📱 Browser Compatibility

- ✅ Chrome 37+ (Web Crypto API support)
- ✅ Firefox 34+
- ✅ Safari 7+
- ✅ Edge 12+

## 🔄 Data Flow

1. **User Registration**
   ```
   Form Submission → Validation → Password Hashing → localStorage Save → Redirect
   ```

2. **User Login**
   ```
   Credentials Input → Password Hashing → Verification → Session Creation → Dashboard
   ```

3. **Page Protection**
   ```
   Page Load → Session Check → Redirect (if needed) → Content Display
   ```

## 🐛 Known Issues & Limitations

- **localStorage Dependency**: Data is stored locally (not persistent across devices)
- **Client-Side Security**: Authentication is client-side only
- **No Server Integration**: No backend database or API
- **Browser Storage Limits**: localStorage has size limitations

## 🚀 Future Enhancements

- [ ] Backend integration with proper database
- [ ] Real-time features (WebSocket integration)
- [ ] Advanced user profiles with avatars
- [ ] Social features (friends, messaging)
- [ ] Image upload and processing
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

**Team Leader - Week 2**  
Riwi - Módulo 3 JavaScript

### Team Members
- **Emmanuel Rendón Goez**
- **Juan Esteban Sepulveda**
- **Andrés Felipe Marín Patiño**
- **Juan Camilo Sánchez Méndez**

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- MDN Web Docs for Web Crypto API documentation
- JavaScript community for best practices and patterns

---

**Note**: This is an educational project demonstrating frontend authentication concepts. For production use, implement proper backend security measures.
