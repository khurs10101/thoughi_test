const { data } = require('../data')
const fetch = require('node-fetch')
const { isUndefined } = require('lodash')

const processResult = async (req, res, next) => {

    let page = req.params.page
    console.log(page)

    let result = await fetch('http://localhost:5000/records')
    result = await result.json()
    console.log(result.length)

    let totalPages = result.length / 10

    if (isUndefined(page)) {
        page = 1
    }

    let idsA = []
    let openA = []
    let closedCount = 0
    let bundleObject = {}

    let prevPage = 0
    let nextPage = 0

    if (page > totalPages) {
        res.status(200).json({
            message: "No more pages"
        })
    } else {

        if (page == 1)
            prevPage = null
        else
            prevPage = page - 1

        if (page == totalPages)
            nextPage = null
        else
            nextPage = parseInt(page) + 1

        for (let i = (page - 1) * 10; i < (page) * 10; i++) {
            idsA.push(result[i]["id"])
            if (result[i]['disposition'] === 'open') {
                openA.push(result[i])
            }

            if (result[i]['disposition'] === 'closed' && (result[i]['color'] === 'red' || result[i]['color'] === 'yellow' || result[i]['color'] === 'blue')) {
                closedCount++
            }
        }

        bundleObject = {
            ids: idsA,
            open: openA,
            closedCount,
            prevPage,
            nextPage
        }

        res.status(200).json(bundleObject)
    }
}


const getAllRecords = (req, res, next) => {
    // console.log(data)
    res.status(200).json(data)
}



module.exports = { getAllRecords, processResult }