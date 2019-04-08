const request = require('request')

const getMuseumObjects = (searchParam, callback) => {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchParam}`
    request({ url, json : true }, (error, response) => {
         if (error) {
            callback('No tienes internet prro', undefined)
        } else if (response.body.total == 0) {
            callback('El query param no existe', undefined)
        } else if (response.body.Response == 'False') {
            callback(response.body.Error, undefined)
        } else {
            const firstArg = response.body.objectIDs[0]
            callback(undefined, firstArg)
        }
    })
}

const getDataFromObject = (firstArg, callback) => {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${firstArg}`
    request({url, json: true }, (error, response) => {
        console.log(error)
        if (error) {
            callback('No tienes internet prro', undefined)
        } else if (response.body.Response == 'False') {
            callback(response.body.Error, undefined)
        } else {
            const data = response.body
            callback(undefined, data)
        }   
    })
}

module.exports = {
    getMuseumObjects: getMuseumObjects,
    getDataFromObject: getDataFromObject
}