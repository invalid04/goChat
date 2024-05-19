package main

import (
	"fmt"
	"io"
	"net/http"
	"math/rand"
	"time"

	"golang.org/x/net/websocket"
)

type Server struct {
	conns map[*websocket.Conn]string
}

func NewServer() *Server {
	return &Server{
		conns: make(map[*websocket.Conn]string),
	}
}

func (s *Server) handleWS(ws *websocket.Conn) {
	fmt.Println("new incoming connection from client:", ws.RemoteAddr())

	user := string('A' + rand.Intn(26))
	s.conns[ws] = user 

	s.readLoop(ws)
}

func (s *Server) readLoop(ws *websocket.Conn) {
	buf := make([]byte, 1024)
	for {
		n, err := ws.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println("read error:", err)
			continue 
		}
		msg := fmt.Sprintf("[%s]: %s", s.conns[ws], string(buf[:n]))

		s.broadcast([]byte(msg))
	}
}

func (s *Server) broadcast(msg []byte) {
	for ws := range s.conns {
		go func(ws *websocket.Conn) {
			if _, err := ws.Write(msg); err != nil {
				fmt.Println("write error:", err)
			}
		}(ws)
	}
}

func main() {
	rand.NewSource(time.Now().UnixNano())

	server := NewServer()
	http.Handle("/ws", websocket.Handler(server.handleWS))
	
	http.ListenAndServe(":8080", nil)
}
