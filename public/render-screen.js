export default function rendeScreen(screen, game, requestAnimationFrame, currentPlayerId){
    const context = screen.getContext('2d')

    const width = game.state.screen.width
    const height = game.state.screen.height

    context.fillStyle = 'white'
    context.clearRect(0, 0, width, height)
    
    for (const playerId in game.state.players){
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }
    
    for (const fruitId in game.state.fruits){
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer){
        context.fillStyle = '#f0db4f'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }
    
    requestAnimationFrame(() => {
        rendeScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}