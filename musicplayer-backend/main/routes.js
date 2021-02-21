var express = require('express')

//allows us to make http request
var router = express.Router()
router.get('/hello', function(req, res) {
    res.json('hello world')
})

module.exports = router
