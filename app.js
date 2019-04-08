var express = require('express')
var app = express()
const met = require('./met.js')
const path = require('path')

app.listen(process.env.PORT || 3000)


// to allow cors
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ '/index.html'))
})

app.get('/students/:id', (req, res) => {
    var id = req.params.id
    if (id !== 'A01039656') {
        res.send({
            "error": "La matricula debe de ser A01039656"
        })
    }
    res.send({
        "id": id,
        "fullname": "Andres Aguirre",
        "nickname": "Aguirre",
        "age": "21"
    })
})


app.get('/met', (req, res) => {
    if (!req.query.search) {
        return res.send({
            "error": "tienes que enviar un search query param"
        })
    }
    met.getMuseumObjects(req.query.search, (error, response) => { 
    if (error) {
        return res.send({
            "error": error
        })
        } else {
            const resultFirstArg = response
            met.getDataFromObject(resultFirstArg, (error, response) => {
                if (error) {
                    return res.send({
                        "error": error
                    })
                } else {
                    return res.send({
                        "searchTerm" : req.query.search,
                        "artist" : response.constituents[0].name,
                        "title" : response.title,
                        "year" : response.objectEndDate,
                        "technique" : response.medium,
                        "metUrl" : response.objectURL
                    })
                }
            })
        }
    })
})