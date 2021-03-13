var AWS = require('aws-sdk');
var fs = require('fs')
const fileUpload = require('express-fileupload');


/*---------------------S3--------------------------------*/
module.exports = app => {
    app.use(fileUpload())
    AWS.config.update({region: 'us-east-2'});
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

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
                if(req.files.musicUploads.length == undefined)
                {
                        
                        let musicFile = req.files.musicUploads;
                        console.log(musicFile.data)
                        //const readStream = fs.createReadStream(musicFile);
                        //console.log(readStream)
                        //readStream.close()
                        // console.log(readStream)
                        // readStream.on('error', function(err) {
                        //     console.log('File Error', err);
                        //   });

                        const params = {
                            Bucket: "musicplayer-song",
                            Key: musicFile.name+'thistacoamazing11111111',
                            Body: musicFile,
                            ACL: "public-read"
                          };
                        
                         await s3.createMultipartUpload (params, function (err, data) {
                            if (err) {
                              console.log("Error", err);
                            } if (data) {
                              console.log("Upload Success", data.Location);
                            }
                          });

                        

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
