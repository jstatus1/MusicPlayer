var AWS  = require('aws-sdk')
const fileUpload = require('express-fileupload');

/*---------------------S3--------------------------------*/
module.exports = app => {
    app.use(fileUpload())
    AWS.config.update({region: 'us-east-2'});
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
    });

    app.post('/api/upload/', (req, res) => {
        if(req.files == null)
        {
            return res.status(400).json({msg: 'No file uploaded'})
        }
        const file = req.files.file

        file.mv(`${__dirname}/musicplayer-frontend/public/uploads/${file.name}`, err=>{
            if(err)
            {
                console.log(err)
                return res.status(500)
            }

            res.json({filename: file.name, filePath: `/uploads/${file.name}`})
        })
    })
}
