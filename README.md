# Go-Vite-Chat

Welcome to Go-Vite-Chat! This project is a simple web chat application built using Go for the backend and React with Vite for the frontend.

## Getting Started

### Backend

1. Navigate to the `server` directory.
2. Run `go run main.go` to start the Go API server.

### Frontend

1. Navigate to the `client` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the frontend development server.

## Usage

Once both the backend and frontend servers are running, you can access the web chat application by visiting `http://localhost:5173` in your web browser.

## Important Note

There is a peculiar issue with browser compatibility when hosting the application. Currently, it only works on Microsoft Edge when accessed through the hosted URL: [https://go-vite-chat.vercel.app/](https://go-vite-chat.vercel.app/). However, users can modify the React websocket URL to `localhost` instead of the hosted backend URL to make it work on any browser. We are actively investigating and resolving this issue.

## Technologies Used

- Go
- React
- Vite

Feel free to reach out with any questions or feedback! 🚀
