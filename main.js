const mc = require('minecraft-protocol')
const config = require('./config.json')
const UUID = require('uuid-1345')

const server = mc.createServer({
  'online-mode': false,
  encryption: true,
  host: config.host,
  port: config.port,
  version: '1.14.4'
})

console.log(`Server started on ${config.host}:${config.port}!`)

server.on('error', (err) => console.error(err))
server.on('connection', client => console.log(client))

server.on('login', client => {
  console.log('got client')
  console.log(client.id)
  client.write('login', {
    entityId: client.id,
    levelType: 'flat',
    gameMode: 3,
    dimension: 1,
    difficulty: 2,
    maxPlayers: server.maxPlayers,
    reducedDebugInfo: false
  })

  client.write('position', {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  })

  const msg = {
    translate: 'chat.type.announcement',
    'with': [
      'Server',
      'Hello, world!'
    ]
  }
  client.write('chat', { message: JSON.stringify(msg), position: 0 })
})