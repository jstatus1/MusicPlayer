var AWS = require('aws-sdk');
var fs = require('fs')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const { Iot } = require('aws-sdk');


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

    music_upload_single = async (req) => 
    {
        let data = []
<<<<<<< HEAD
        let musicFile = req.files.musicUploads;   
        let albumArtFile = req.files.album_art;  
        var userId = req.user.uid
        // var basic_info = JSON.parse(req.body.basic_info)
        // var metadata = JSON.parse(req.body.metadata) 

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


        //upload to database
        
        
     
        
       
        /**
        * title
        * genre
        * description
        * caption
        * user_id
        * album_id
        * duration
        * release_date
        * song_image
        * publisher
        * ISRC
        * composer
        * release_title
        * buy_link
        * album_title
        * record_label
        * barcode
        * ISWC
        * P_Line
        * explicit_content
        * / */

        

        //TODO: get the link for the photo
         await s3.upload (pictureUpload_params, function (err, data) {
            if (err) {
              console.log("Error", err);
            } if (data) {
              console.log("Upload Success", data.Location);
            }
          }).on('httpUploadProgress', e => {

            console.log( `${e.loaded} + " of " + ${e.total} + " bytes"`)
                
          }).send((err,data) => {
              console.log('data:', data)
          });

        // const value = [basic_info.title, 
        //     basic_info.selected_genre,
        //     basic_info.
        // ]

        // await pool.query(`INSERT INTO songs(title,genre,description,caption,user_id,
        //                                     release_date,song_image,num_played,publisher
        //                                     ,ISRC,composer,release_title,buy_link,album_title,
        //                                     record_label,barcode,ISWC,P_Line,explicit_content)
        //                     VALUES($1, $2, $3, $4,$5,$6,$7)
        //                     ON CONFLICT DO NOTHING`,value, async (error, result)=> {
        //                     if (error) {
        //                     console.log(error);
        //                     }
        //                 })
        
        //  await s3.upload (params, function (err, data) {
        //     if (err) {
        //       console.log("Error", err);
        //     } if (data) {
        //       console.log("Upload Success", data.Location);
        //     }
        //   }).on('httpUploadProgress', e => {

        //     console.log( `${e.loaded} + " of " + ${e.total} + " bytes"`)
                
        //   }).send((err,data) => {
        //       console.log('data:', data)
        //   });

        

        data.push({
                    name: musicFile.name,
                    mimetype: musicFile.mimetype,
                    size: musicFile.size
        });
        return data;
=======
        let musicFile = req.files.musicUploads;
        console.log(req.files)            

                        const params = {
                            Bucket: "musicplayer-song",
                            Key: uuidv4(),
                            Body: musicFile.data,
                            ACL: "public-read"
                          };
                        
                        //  await s3.upload (params, function (err, data) {
                        //     if (err) {
                        //       console.log("Error", err);
                        //     } if (data) {
                        //       console.log("Upload Success", data.Location);
                        //     }
                        //   }).on('httpUploadProgress', e => {

                        //     console.log( `${e.loaded} + " of " + ${e.total} + " bytes"`)
                             
                        //   }).send((err,data) => {
                        //       console.log('data:', data)
                        //   });

                        

                        data.push({
                                    name: musicFile.name,
                                    mimetype: musicFile.mimetype,
                                    size: musicFile.size
                                });
                            return data;
>>>>>>> parent of f1cdf6e0 (Merge branch 'main' into FrontEnd_Edward)
    }


    music_upload_multiple = async (req) => 
    {
        let data = []
        let musicFile = req.files.musicUploads;
                    

                        
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
                    data = music_upload_single(req)
                }else{
                    data = music_upload_multiple(req)
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