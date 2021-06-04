const fs = require('fs')
const path = require('path')


var tmpFile = fs.readFileSync(path.resolve(__dirname, 's_x.ini'))



setTimeout(() => {
    fs.writeFileSync(path.resolve(__dirname, 's_x Nex.ini'), tmpFile)
}, 5000);