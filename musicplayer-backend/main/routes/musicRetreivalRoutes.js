var pool = require('../db');

module.exports = app => {

    //join songs on id and take all the column from songs and id
    

    app.get('/api/get/tracks', (req, res) => {
        var user_id = req.user.uid
        
        pool.query(`SELECT songs.*, users.username 
        FROM songs LEFT JOIN users ON
        songs.user_id=users.uid
        WHERE songs.user_id=$1`,[user_id]).then(
            data => {
                res.send(data.rows)
            }
        ).catch(error=> {
            console.log(error)
        })
    })
}