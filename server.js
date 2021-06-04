const net = require('net')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const colors = require('colors')
const tokensList = require('./TOKENS.json')


const server = net.createServer()

const activeConnection = []

const getActiveConnectionList = function () {
    activeConnection.forEach(elem => {
        if (elem.port === rport && elem.address === raddr) {
            elem.clientID = jsodData.ID
        }
    })
}

const getActiveConnection = function (rport, raddr) {
    activeConnection.forEach(elem => {
        if (elem.port === rport && elem.address === raddr) {
            console.log(elem)
        }
    })
}

const dataParser = data => data.split('^*^').filter(elem => elem != '')

const createSession = function (data, rport, raddr, rfamily, socket) {
    var tmp = {
        sessionID: Date.now(),
        clientID: '',
        port: rport,
        address: raddr,
        family: rfamily,
        isAutorisated: ''
    }
    // console.log(dataParser(data))
    activeConnection.push(tmp)

    // Избавляемся от пустых элементов массива
    var dataArr = dataParser(data)


    const getToken = (dataArr) => {
        for (value of dataArr) {
            if (/^TOKEN/.test(value)) {
                return value.substr(5)
            }
        }
    }

    const getJson = (dataArr) => {
        for (value of dataArr) {
            if (/^JSON/.test(value)) {
                return JSON.parse(value.substr(4))
            }
        }
    }



    // Авторизация по токену
    const autarization = (TOKEN, rport, raddr, activeConnection) => {
        var isAutorisated = false
        tokensList.forEach(elems => {
            if (elems.TOKEN === TOKEN) {
                isAutorisated = true
                return
            }
        })
        if (isAutorisated) {
            activeConnection.forEach(elem => {
                if (elem.port === rport && elem.address === raddr) {
                    elem.isAutorisated = isAutorisated
                    // socket.write('^*^JSON' + JSON.stringify(elem))
                    console.log('Client whis ID ' + colors.bgGreen.black(elem.clientID) + ' authorization successful')
                }
            })
        } else {
            socket.write('Your token was not found')
            socket.destroy()
            console.log('Authorization failed')
        }
    }

    autarization(getToken(dataArr), rport, raddr, activeConnection)

    // Заполнение объекта activeConnection
    const setConnectionList = (data, rport, raddr, activeConnection) => {
        activeConnection.forEach(elem => {
            if (elem.port === rport && elem.address === raddr) {
                elem.clientID = data.ID
            }
        })
    }

    setConnectionList(getJson(dataArr), rport, raddr, activeConnection)



}

server.on('connection', (socket) => {
    var rport = socket.remotePort;
    var raddr = socket.remoteAddress;
    var rfamily = socket.remoteFamily;

    console.log(colors.bgGreen.black('New connection'))
    // console.log(raddr)
    // console.log(rport)
    // console.log(rfamily)

    socket.on('data', (data) => {

        // console.log(data)
        try {
            createSession(data, rport, raddr, rfamily, socket)
            console.log(activeConnection)
        } catch (error) {
            console.log(error)
        }

        // var jsodData = JSON.parse(data)
        // console.log(typeof data)
        // socket.ID = jsodData.ID
        // socket.write('hello')
    })

    socket.on('close', () => {
        // socket.remoteAddress
        console.log(socket.remoteAddress)
        console.log(socket.remotePort)
        server.getConnections((error, count) => {
            if (error) {
                console.error(error)
            } else {
                console.log('Active connection ' + count)
            }
        })
    })

    socket.on('error', (error) => {
        // console.log(error)
        // console.log(socket.remoteAddress)
        // console.log(socket.remotePort)

    })

    socket.setEncoding('utf8')

    server.getConnections((error, count) => {
        if (error) {
            console.error(error)
        } else {
            console.log('Active connection ' + count)
        }
    })
})

server.listen(3333)