const net = require('net')
const fs = require('fs')
const path = require('path')
const config = require('./config.json')


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjI2MzIyNDIsImV4cCI6MTY1NDE2ODI0MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0._kXWtMl66xZWH2l4UzuZ-DJxaj4tAVf8jFLTLXrRQvI'



// var tmpFile = fs.readFileSync(path.resolve(__dirname, 's_x.ini'))

var client = new net.Socket()
client.connect({
    host: '127.0.0.1',
    port: 3333,
    family: 'IPv4'
})

client.on('connect', () => {
    client.write('^*^JSON' + JSON.stringify(config))
    client.write('^*^TOKEN' + TOKEN)
})


client.on('data', (data) => {
    console.log('Data from server: ' + data)
    // var tmp = JSON.parse(data)
    // console.log(tmp);
    // fs.writeFileSync(path.resolve(__dirname, 'file.ini'), data)
})

client.on('close', () => {
    console.log('Вы отключены')
})
