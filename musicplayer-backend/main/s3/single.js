const fileUpload = require('express-fileupload');


/*---------------------S3--------------------------------*/
module.exports = app => {
     app.post('/api/SingleUpload/', async (req, res) => {
        try {
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let musicFile = req.files.musicUploads;
                
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                musicFile.mv('./main/s3/storage/' + musicFile.name);
    
                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: musicFile.name,
                        mimetype: musicFile.mimetype,
                        size: musicFile.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });


    app.post('/api/music_upload/', async (req, res) => {
        try {
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let data = []; 
                console.log(req.files.musicUploads)
                
                if(req.files.musicUploads.length == undefined)
                {
                        let musicFile = req.files.musicUploads;
                        musicFile.mv('./main/s3/storage/' + musicFile.name);
                        data.push({
                                    name: musicFile.name,
                                    mimetype: musicFile.mimetype,
                                    size: musicFile.size
                                });
                }else{
                    for(let i = 0; i < req.files.musicUploads.length; i++)
                    {
                        let musicFile = req.files.musicUploads[i];
                        musicFile.mv('./main/s3/storage/' + musicFile.name);
                        data.push({
                                    name: musicFile.name,
                                    mimetype: musicFile.mimetype,
                                    size: musicFile.size
                                });
                    }
                }

                

                //return response
                res.send({
                    status: true,
                    message: 'Files are uploaded',
                    data: data
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
}
