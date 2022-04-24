const fs = require('fs')
const http = require('http')
const os = require('os')

const host = '127.0.0.1'
const port = 5500

const OSContent = {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    numberOfCPUS: os.cpus(),
    networkInterfaces: os.networkInterfaces(),
    uptime: os.uptime()
}

var OS = JSON.stringify(OSContent)

const server = http.createServer((req, res) => {
    const URL = req.url

    if(URL === "/") {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('./Pages/index.html').pipe(res)
    } else if(URL === "/about") {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('./Pages/about.html').pipe(res)
    } else if(URL === "/sys") {
        res.statusCode = 201
        res.setHeader('Content-Type', 'text/plain')

        fs.writeFile('osfile.json', OS, 'utf-8', (err) => console.error(err))

        console.log('Your OS info has been saved successfully!')
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('./Pages/404.html').pipe(res)
    }
})

server.listen(port, host, () => {
    console.log(`Server running at ${host}:${port}`)
})