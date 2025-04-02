# AniVerse

AniVerse is an anime streaming platform inspired by popular movie streaming services. This project leverages the MERN (MongoDB, Express.js, React.js, Node.js) stack to deliver a seamless user experience for anime enthusiasts.

## Features

- **User Authentication**: Secure user registration and login functionalities.
- **Anime Catalog**: Browse and search through a comprehensive list of anime titles.
- **Streaming**: High-quality video playback for selected anime episodes.
- **User Profiles**: Personalized profiles allowing users to manage watchlists and preferences.
- **Admin Panel**: Administrative interface for managing content and users.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Shrey-Bhandari/AniVerse.git
   cd AniVerse
   ```


2. **Install Dependencies**:

   For the server:

   ```bash
   cd server
   npm install
   ```


   For the client:

   ```bash
   cd ../client
   npm install
   ```


3. **Set Up Environment Variables**:

   Create a `.env` file in the `server` directory with the following content:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```


## Running the Application

1. **Start the Server**:

   ```bash
   cd server
   npm start
   ```


2. **Start the Client**:

   ```bash
   cd ../client
   npm start
   ```


   The application should now be accessible at `http://localhost:3000`.

## Project Structure

- `server/`: Contains the backend code (Express.js, MongoDB).
- `client/`: Contains the frontend code (React.js).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

This project was inspired by tutorials on creating video streaming platforms using the MERN stack. 
