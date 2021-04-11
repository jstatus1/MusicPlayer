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


    //S3 Delete Function
    deleteAudioFromS3 = (key) => {
        var params = {
            Bucket: 'musicplayer-song', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }
    
    deleteAudioImageFromS3 = (key) => {
        var params = {
            Bucket: 'musicplayer-songart', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }

    deleteAlbumImageFromS3 = (key) => 
    {
        var params = {
            Bucket: 'musicplayer-album-art', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }
    //logic for single upload
    music_upload_single = async (req, res) => 
    {
        let musicFile = req.files.musicUploads;   
        let audio_image_File = req.files.audio_image;  
        var userId = req.user.uid
        
        var basic_info = JSON.parse(req.body.basic_info)
        var metadata = JSON.parse(req.body.metadata) 
    
        var s3_audio_image_key = uuidv4()
        var s3_audio_key = uuidv4()
       
        //Params For AWS
        const audio_params = {
            Bucket: "musicplayer-song",
            Body: musicFile.data,
            Key: s3_audio_key,
            ACL: "public-read"
        };

       

        if(audio_image_File != undefined)
        {
            const audio_image_params = {
                    Bucket: "musicplayer-songart",
                    Body: audio_image_File.data,
                    Key: s3_audio_image_key,
                    ACL: "public-read"
            };
            await s3.upload (audio_image_params, function (err, data) {
                if (err) {
                  console.log("Error", err);
                }
              }).send(async (err,SongArtLink) => {
                  try{
                    
                    await s3.upload (audio_params, function (err, data) {
                        if (err) {
                          console.log("Error", err);
                          deleteAudioImageFromS3(s3_audio_image_key)
                        } if (data) {
                          console.log("Upload Success", data.Location);
                        }
                      }).send(async (err,audio_link) => {
                          try{
                                //TODO: include album id for front end and backend
                                const songValue = [
                                    basic_info.title,
                                    basic_info.selected_genre,
                                    audio_link.Location,
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
                                    metadata.album_title,
                                    s3_audio_key,
                                    s3_audio_image_key
                                ]
                                
                                //TODO: UPDATE LENGTH
                                await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                    release_date,song_image,publisher
                                                    ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                    explicit_content,buy_link,album_title,s3_audio_key,s3_image_key)
                                                    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
                                                    ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                    if (error) {
                                                        console.log(error);
                                                        deleteAudioFromS3(s3_audio_key)
                                                        deleteAudioImageFromS3(s3_audio_image_key)
                                                        res.send({
                                                            status: false,
                                                            message: "Failed To Upload"
                                                        })
                                                    }else{
                                                        res.send({
                                                            status: true,
                                                            message: "Successfully Uploaded"
                                                        })
                                                    }})
    
                          }catch(err)
                          {

                              res.send({
                                        status: false,
                                        message: "Server Is Down, Please Try Again Later"
                                    })
                          }
                      });
                    
    
    
                  }catch(err)
                  {
                      console.log("Error Inserting Song To Database")
                  }
                  
              });
        
        }else{
            try{
                    
                await s3.upload (audio_params, function (err, data) {
                    if (err) {
                      console.log("Error", err);
                    } if (data) {
                      console.log("Upload Success", data.Location);
                    }
                  }).send(async (err,audio_link) => {
                      try{
                            //TODO: include album id for front end and backend
                            const songValue = [
                                basic_info.title,
                                basic_info.selected_genre,
                                audio_link.Location,
                                basic_info.description,
                                basic_info.caption,
                                userId,
                                metadata.release_date,
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
                                metadata.album_title,
                                s3_audio_key
                            ]
                            
                            //TODO: UPDATE LENGTH
                            await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                release_date,publisher
                                                ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                explicit_content,buy_link,album_title,s3_audio_key)
                                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
                                                ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                if (error) {
                                                    console.log(error);
                                                    deleteAudiosFromS3(s3_audio_key)
                                                    res.send({
                                                        status: false,
                                                        message: "Failed To Upload"
                                                    })
                                                }else{
                                                    res.send({
                                                        status: true,
                                                        message: "Successfully Uploaded"
                                                    })
                                                }})

                      }catch(err)
                      {
                          res.send({
                                    status: false,
                                    message: "Server Is Down, Please Try Again Later"
                                })
                      }
                  });
                


              }catch(err)
              {
                  console.log("Error Inserting Song To Database")
              }
        }
    }


    //logic for multiple upload
    album_upload = async(req, res) => {
        let musicFile = req.files.musicUploads;   
        let audio_image_File = req.files.album_art;
        var metadata = JSON.parse(req.body.metadata)   
        var userId = req.user.uid
        var s3_audio_album_image_key = uuidv4();

        
        if(audio_image_File != undefined)
        {   
            //insert into music player album art on s3
            const audio_image_params = {
                Bucket: "musicplayer-album-art",
                Body: audio_image_File.data,
                Key: s3_audio_album_image_key,
                ACL: "public-read"
            }

            console.log("uploading To S3 album art")
            await s3.upload (audio_image_params, function (err, data) {
                            if (err) {
                            console.log("Error", err);
                            }
                        }).send( (err, albumArtLink) => {
                            
                                
                                let albumArtValue = [
                                    userId,
                                    metadata.release_date,
                                    metadata.artist,
                                    metadata.album_title,
                                    albumArtLink.Location,
                                    metadata.publisher,
                                    metadata.isrc,
                                    metadata.composer,
                                    metadata.release_title,
                                    metadata.buy_link,
                                    metadata.album_title,
                                    metadata.record_label,
                                    metadata.barcode,
                                    metadata.iswc,
                                    metadata.p_line,
                                    metadata.explicit_content,
                                    s3_audio_album_image_key
                                ]

                                 pool.query(`INSERT INTO albums(user_id,release_date,artists
                                    album_name, album_art, publisher, ISRC, composer, release_title,
                                    buy_link,album_title, record_label, barcode, ISWC, P_Line,
                                    explicit_content, s3_album_image_key)
                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
                                ON CONFLICT DO NOTHING`,albumArtValue, async (error, result)=> {
                                if (error) {
                                    console.log(error);
                                    deleteAlbumImageFromS3(s3_audio_album_image_key)
                                    return res.send({
                                        status: false,
                                        message: "Failed To Upload"
                                    })
                                }else{
                                    
                                    return res.send({
                                        status: false,
                                        message: "Failed To Upload"
                                    })
                                }})
                        })

        }else{

        }



        


        // for(let i = 0; i < musicFile.length; i++)
        // {
        //     var basic_info = JSON.parse(req.body.basic_info[i])
        //     var s3_audio_image_key = uuidv4()
        //     var s3_audio_key = uuidv4()
            
        //     Params For AWS
        //     const audio_params = {
        //         Bucket: "musicplayer-song",
        //         Body: musicFile[i].data,
        //         Key: s3_audio_key,
        //         ACL: "public-read"
        //     };

            
        //     if(audio_image_File != undefined)
        //     {
        //         const audio_image_params = {
        //             Bucket: "musicplayer-songart",
        //             Body: audio_image_File.data,
        //             Key: s3_audio_image_key,
        //             ACL: "public-read"
        //         };
            
        //         await s3.upload (audio_image_params, function (err, data) {
        //             if (err) {
        //             console.log("Error", err);
        //             }
        //         }).send(async (err,SongArtLink) => {
        //             try{
                        
        //                 await s3.upload (audio_params, function (err, data) {
        //                     if (err) {
        //                     console.log("Error", err);
        //                     deleteAudioImageFromS3(s3_audio_image_key)
        //                     } if (data) {
        //                     console.log("Upload Success", data.Location);
        //                     }
        //                 }).send(async (err,audio_link) => {
        //                     try{
        //                             TODO: include album id for front end and backend
        //                             const songValue = [
        //                                 basic_info.title,
        //                                 basic_info.selected_genre,
        //                                 audio_link.Location,
        //                                 basic_info.description,
        //                                 basic_info.caption,
        //                                 userId,
        //                                 metadata.release_date,
        //                                 SongArtLink.Location,
        //                                 metadata.publisher,
        //                                 metadata.isrc,
        //                                 metadata.composer,
        //                                 metadata.release_title,
        //                                 metadata.record_label,
        //                                 metadata.barcode,
        //                                 metadata.iswc,
        //                                 metadata.p_line,
        //                                 metadata.explicit_content,
        //                                 metadata.buy_link,
        //                                 metadata.album_title,
        //                                 s3_audio_key,
        //                                 s3_audio_image_key
        //                             ]
                                    
        //                             TODO: UPDATE LENGTH
        //                             await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
        //                                                 release_date,song_image,publisher
        //                                                 ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
        //                                                 explicit_content,buy_link,album_title,s3_audio_key,s3_image_key)
        //                                                 VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
        //                                                 ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
        //                                                 if (error) {
        //                                                     console.log(error);
        //                                                     deleteAudioFromS3(s3_audio_key)
        //                                                     deleteAudioImageFromS3(s3_audio_image_key)
        //                                                     res.send({
        //                                                         status: false,
        //                                                         message: "Failed To Upload"
        //                                                     })
        //                                                 }else{
        //                                                     res.send({
        //                                                         status: true,
        //                                                         message: "Successfully Uploaded"
        //                                                     })
        //                                                 }})
        
        //                     }catch(err)
        //                     {

        //                         res.send({
        //                                     status: false,
        //                                     message: "Server Is Down, Please Try Again Later"
        //                                 })
        //                     }
        //                 });
                        
        
        
        //             }catch(err)
        //             {
        //                 console.log("Error Inserting Song To Database")
        //             }
                    
        //         });
        //         }else{
                    
        //         }

        //         res.send({status: true, message: "Done"})
        // }
        return
    
        

       

        if(audio_image_File != undefined)
        {
            
        
        }else{
            try{
                    
                await s3.upload (audio_params, function (err, data) {
                    if (err) {
                      console.log("Error", err);
                    } if (data) {
                      console.log("Upload Success", data.Location);
                    }
                  }).send(async (err,audio_link) => {
                      try{
                            //TODO: include album id for front end and backend
                            const songValue = [
                                basic_info.title,
                                basic_info.selected_genre,
                                audio_link.Location,
                                basic_info.description,
                                basic_info.caption,
                                userId,
                                metadata.release_date,
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
                                metadata.album_title,
                                s3_audio_key
                            ]
                            
                            //TODO: UPDATE LENGTH
                            await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                release_date,publisher
                                                ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                explicit_content,buy_link,album_title,s3_audio_key)
                                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
                                                ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                if (error) {
                                                    console.log(error);
                                                    deleteAudiosFromS3(s3_audio_key)
                                                    res.send({
                                                        status: false,
                                                        message: "Failed To Upload"
                                                    })
                                                }else{
                                                    res.send({
                                                        status: true,
                                                        message: "Successfully Uploaded"
                                                    })
                                                }})

                      }catch(err)
                      {
                          res.send({
                                    status: false,
                                    message: "Server Is Down, Please Try Again Later"
                                })
                      }
                  });
                


              }catch(err)
              {
                  console.log("Error Inserting Song To Database")
              }
        }
    }
    
    //single upload
    app.post('/api/single_audio_upload/', async (req, res) => {
        return music_upload_single(req, res)
    });

   //multiple upload

   //album upload
    app.post('/api/album_audio_upload/', async (req, res) => {
        return album_upload(req, res)
    })

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