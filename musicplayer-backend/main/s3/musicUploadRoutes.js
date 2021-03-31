var AWS = require('aws-sdk');
var fs = require('fs')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const { Iot } = require('aws-sdk');
var pool = require('../db')


/*---------------------S3--------------------------------*/
module.exports = app => {

    const socket = require('../socket')

    app.use(fileUpload())
    AWS.config.update({region: 'us-east-2'});
    const s3 = new AWS.S3();

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
                    name: uuidv4(),
                    mimetype: musicFile.mimetype,
                    size: musicFile.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
    });

    music_upload_single = async (req, res) => 
    {
        let data = []
        let musicFile = req.files.musicUploads;   
        let albumArtFile = req.files.album_art;  
        var userId = req.user.uid
        var basic_info = JSON.parse(req.body.basic_info)
        var metadata = JSON.parse(req.body.metadata) 

       
        //Params For AWS
        const musicplayer_params = {
            Bucket: "musicplayer-song",
            Body: musicFile.data,
            Key: uuidv4(),
            ACL: "public-read"
        };

        const pictureUpload_params = {
                Bucket: "musicplayer-songart",
                Body: albumArtFile.data,
                Key: uuidv4(),
                ACL: "public-read"
        };

        //TODO: get the link for the photo
         await s3.upload (pictureUpload_params, function (err, data) {
            if (err) {
              console.log("Error", err);
            } if (data) {
              console.log("Upload Success", data.Location);
            }
          }).send(async (err,SongArtLink) => {
              try{
                
                await s3.upload (musicplayer_params, function (err, data) {
                    if (err) {
                      console.log("Error", err);
                    } if (data) {
                      console.log("Upload Success", data.Location);
                    }
                  }).on('httpUploadProgress', e => {

                    console.log( `${e.loaded} + " of " + ${e.total} + " bytes"`)
                        
                  }).send(async (err,SongLink) => {
                      try{
                            //TODO: include album id for front end and backend
                            const songValue = [
                                basic_info.title,
                                basic_info.selected_genre,
                                SongLink.Location,
                                basic_info.description,
                                basic_info.caption,
                                userId,
                                metadata.release_date,
                                SongArtLink.Location,
                                metadata.publisher,
                                metadata.isrc,
                                metadata.composer,
                                metadata.release_title,
                                metadata.record_label,
                                metadata.barcode,
                                metadata.iswc,
                                metadata.p_line,
                                metadata.explicit_content,
                                metadata.buy_link,
                                metadata.album_title
                            ]
                            
                            //TODO: UPDATE LENGTH
                            await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                release_date,song_image,publisher
                                                ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,explicit_content,buy_link,album_title)
                                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
                                                ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                if (error) {
                                                    console.log(error);
                                                }else{
                                                    res.send({
                                                        status: true,
                                                        message: "Successfully Uploaded"
                                                    })
                                                }})

                      }catch(err)
                      {
                          console.log("Failed To Post Song On AWS S3")
                      }
                  });
                


              }catch(err)
              {
                  console.log("Error Inserting Song To Database")
              }
              
          });
    }


    music_upload_multiple = async (req, res) => 
    {
        let data = []
                        
        for(let i = 0; i < req.files.musicUploads.length; i++)
        {
            let musicFile = req.files.musicUploads[i];
            

            const params = {
                Bucket: "musicplayer-song",
                Key: uuidv4(),
                Body: musicFile.data,
                ACL: "public-read"
                };
            
                await s3.upload (params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } if (data) {
                    console.log("Upload Success", data.Location);
                }
                }).on('httpUploadProgress', e => {
                
                socket.emit('upload', e)
                }).send((err,data) => {
                    console.log('data:', data)
                });

                              

                data.push({
                            name: musicFile.name,
                            mimetype: musicFile.mimetype,
                            size: musicFile.size
                        });
            }
            return data;
    }



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
                    
                    data = music_upload_single(req, res)
                }else{
                    data = music_upload_multiple(req, res)
                }
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
}