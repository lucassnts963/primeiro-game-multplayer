import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const port = 5050

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`> Emmitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer({playerId: playerId})
    
    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(port, () => {
    console.log(`> Server listening on port: ${port}`)
})