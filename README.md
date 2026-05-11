Lizzn.

A modern full-stack music streaming platform built with the MERN stack.
Lizzn allows users to discover albums, stream music, and manage playback with a clean responsive interface and secure authentication system.


Features

* User Authentication (Login/Register)
* Artist & Listener Roles
* Upload Albums & Songs
* Music Streaming
* Global Audio Player
* Album Management
* Protected Routes
* Responsive UI
* JWT Authentication
* Cookie-based Sessions
* REST API Architecture


Tech Stack

Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* CORS


Project Structure

Lizzn/
│
├── client/              # Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/              # Backend
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── package.json
│
└── README.md



Environment Variables

Frontend (client/.env)

VITE_SERVER_URL=https://your-backend-url.onrender.com/api


Backend (server/.env)

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-frontend-url.vercel.app



Installation

Clone Repository

git clone https://github.com/your-username/lizzn.git
cd lizzn


Install Dependencies

npm install
npm --prefix server install
npm --prefix client install


Run Locally

Start Backend

cd server
npm run dev


Start Frontend

cd client
npm run dev


Deployment

Frontend

Deploy on:

* Vercel

Backend

Deploy on:

* Render

Database

* MongoDB Atlas


API Features

Authentication

* Register User
* Login User
* Logout User
* Check Current User

Music

* Upload Album
* Fetch Albums
* Stream Music
* Album Details


Authentication System

Lizzn uses:

* JWT Tokens
* HTTP-only Cookies
* Protected Backend Routes
* Role-based Authorization


UI Highlights

* Minimal Dark Theme
* Smooth Audio Experience
* Responsive Design
* Persistent Global Player
* Artist Dashboard


Future Improvements

* Playlist System
* Likes & Favorites
* Search Functionality
* Real-time Listening Rooms
* Music Recommendations
* Comments & Reviews


License

This project is developed for learning and educational purposes.


Author

Developed by Ansh Awasthy.
