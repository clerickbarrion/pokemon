const player = {
    name: document.getElementById('player-name'),
    hp: document.getElementById('player-hp'),
    img: document.getElementById('player')
}
const enemy = {
    name: document.getElementById('enemy-name'),
    hp: document.getElementById('enemy-hp'),
    img: document.getElementById('enemy')
}

const moves = document.getElementsByClassName('move')
const commentary = document.getElementById('commentary')

document.querySelector('#battle').addEventListener('click', async () => {
    const playerPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 721) }/`).then(res=>res.json()).then(pokemon=>pokemon)
    const enemyPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 721) }/`).then(res=>res.json()).then(pokemon=>pokemon)

    player.name.textContent = playerPokemon.name
    player.hp.textContent = playerPokemon.stats[0].base_stat * 2 + 110
    player.attack = playerPokemon.stats[1].base_stat * 2 + 5
    player.defense = playerPokemon.stats[2].base_stat * 2 + 5
    player.specialAttack = playerPokemon.stats[3].base_stat * 2 + 40
    player.specialDefense = playerPokemon.stats[4].base_stat * 2 + 40
    player.img.src = playerPokemon.sprites['back_default']
    player.type = playerPokemon.types[0].type.name
    player.speed = playerPokemon.stats[5].base_stat

    enemy.name.textContent = enemyPokemon.name
    enemy.hp.textContent = enemyPokemon.stats[0].base_stat * 2 + 110
    enemy.img.src = enemyPokemon.sprites['front_default']
    enemy.type = enemyPokemon.types[0].type.name
    enemy.speed = enemyPokemon.stats[5].base_stat
    enemy.moves = []
    for (let i = 0; i < 4; i++){
        enemy.moves.push(enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)].move.name)
    }

    Array.from(moves).forEach(move => {
        move.disabled = true
        move.textContent = playerPokemon.moves[Math.floor(Math.random() * playerPokemon.moves.length)].move.name
        move.addEventListener('click', async () => {
            await fetch(`https://pokeapi.co/api/v2/move/${move.textContent}/`).then(res=>res.json()).then(move=>{
                enemy.hp.textContent -= move.power
                commentary.textContent = `${player.name.textContent} used ${move.name}!`
            })
            await fetch(`https://pokeapi.co/api/v2/move/${enemy.moves[Math.floor(Math.random() * enemy.moves.length)]}/`).then(res=>res.json()).then(move=>{
                player.hp.textContent -= move.power
                commentary.textContent = `${enemy.name.textContent} used ${move.name}!`
            })
        })
    })
})

document.getElementById('start').addEventListener('click', () => {
    Array.from(moves).forEach(move => {
        move.disabled = false
    })
    if (enemy.speed > player.speed) {
        fetch(`https://pokeapi.co/api/v2/move/${enemy.moves[Math.floor(Math.random() * enemy.moves.length)]}/`).then(res=>res.json()).then(move=>{
            player.hp.textContent -= move.power
            commentary.textContent = `${enemy.name.textContent} used ${move.name}!`
        })
    }
})


// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
// const CANVAS_WIDTH = canvas.width = 670
// const CANVAS_HEIGHT = canvas.height = 670

// document.querySelector('button').addEventListener('click', async () => {
//     const rng = Math.floor(Math.random() * 1017) 
//     const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${rng}/`)
//     .then(response => response.json()).then(pokemon=>pokemon.sprites['front_default'])
//     const img = document.querySelector('img')
//     img.style.display = 'block'
//     img.src = pokemon
// })

// function animate(){
//     ctx.clearRect(0,0,canvas.width,canvas.height)
//     game.update();
//     game.draw(ctx)
//     requestAnimationFrame(animate)
// }

// class Game {
//     constructor(width,height){
//         this.width = width
//         this.height = height;
//         this.player = new Player(this)
//         this.input = new InputHandler(this)
//         this.keys = []
//     }
//     // updates object properties
//     update(){
//         // player
//         this.player.update();
        
//     }
//     // draws objects on canvas with updated properties
//     draw(context){
//         this.player.draw(context);
//     }
// }

// class Player {
//     constructor(game){
//         this.game = game
//         this.width = 50
//         this.height = 70
//         this.x = 0
//         this.y = game.height/2
//         this.speedY = 0
//         this.maxSpeed = 5
//         this.speedX = 0
//         this.image = document.getElementById('player')
//     }
//     update() {
//         // movement
//         if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
//         else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
//         else this.speedY = 0

//         if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed
//         else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed
//         else this.speedX = 0
//         this.y += this.speedY
//         this.x += this.speedX
//     }
//     draw(context){
//         context.fillStyle = 'red'
//         context.fillRect(this.x,this.y,this.width,this.height)
//         // context.drawImage(this.image, this.x, this.y)
//     }
// }

// class InputHandler {
//     constructor(game){
//         this.game = game;
//         window.addEventListener('keydown', e => {
//             // prevents multiple key presses from being added to the array
//             if(((e.key === 'ArrowUp') || (e.key === 'ArrowDown')
//                 || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight'))
//                 && this.game.keys.indexOf(e.key)===-1) {
//                     this.game.keys.push(e.key)
//             }
//         })
//         // removes key presses from the array
//         window.addEventListener('keyup', e => {
//             if (this.game.keys.indexOf(e.key) > -1) {
//                 this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
//             }
//         })
//     }
// }
// const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT)
// animate()