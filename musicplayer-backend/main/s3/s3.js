var AWS  = require('aws-sdk')
var multer = require('multer')
const fileUpload = require('express-fileupload');


const storage = multer.memoryStorage()
const upload = multer({storage: storage})



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

    app.post('/api/upload/', async (req, res) => {
        if(req.files == null)
        {
            return res.status(400).json({msg: 'No file uploaded'})
        }

        console.log("Length: " ,req.files.length)
        const info = []
        for (var i = 0; i < req.files.length; i++) {
            const file = req.files[i].file;
            console.log(file.name)
            file.mv(`${__dirname}/musicplayer-frontend/public/uploads/${file.name}`, err=>{
                if(err)
                {
                    console.log(err)
                    return res.status(500)
                }
            })
            info.push({filename: file.name, filePath: `/uploads/${file.name}`})
        }

        return res.json(info)
    })
}
