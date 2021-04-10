var pool = require('../db')

module.exports = app => {

    app.get('/api/get/notifications', async (req, res) => {
        pool.query(`SELECT * FROM notifications
                WHERE receiver_id=$1 ORDER BY created_at`, [ req.query.id ],
                (q_err, q_res) => {
                  res.send({
                    status: true,
                    message: q_res.rows
                })
        })
    })

}