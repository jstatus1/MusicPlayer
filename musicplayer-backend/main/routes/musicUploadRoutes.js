var AWS = require('aws-sdk');
var fs = require('fs')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const { Iot } = require('aws-sdk');
var pool = require('../db');
const { response } = require('express');


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
                                    metadata.duration,
                                    s3_audio_key,
                                    s3_audio_image_key
                                ]
                                
                                //TODO: UPDATE LENGTH
                                await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                    release_date,song_image,publisher
                                                    ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                    explicit_content,buy_link,album_title,duration,s3_audio_key,s3_image_key)
                                                    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
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
                                metadata.duration,
                                s3_audio_key
                            ]
                            
                            //TODO: UPDATE LENGTH
                            await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                release_date,publisher
                                                ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                explicit_content,buy_link,album_title,duration,s3_audio_key)
                                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
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

        //if album has an image
        if(audio_image_File != undefined)
        {   
            
            //insert into music player album art on s3
            const audio_image_params = {
                Bucket: "musicplayer-album-art",
                Body: audio_image_File.data,
                Key: s3_audio_album_image_key,
                ACL: "public-read"
            }

            //upload album image
           await s3.upload (audio_image_params, async (err, data) => {
                            if (err) {
                            console.log("Error", err);
                            }
                        }).send( async (err, albumArtLink) => {
                            
                                
                                let albumArtValue = [
                                    userId,
                                    metadata.release_date,
                                    metadata.artist,
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

                                //query to save the album image
                                 await pool.query(`INSERT INTO albums(user_id,release_date,artists,
                                     album_art, publisher, ISRC, composer, release_title,
                                    buy_link,album_title, record_label, barcode, ISWC, P_Line,
                                    explicit_content, s3_album_image_key)
                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
                                ON CONFLICT DO NOTHING`,albumArtValue, async (error, result)=> {
                                    if (error) {
                                        console.log(error);
                                        deleteAlbumImageFromS3(s3_audio_album_image_key)
                                        return res.send({
                                            status: false,
                                            message: "Failed To Upload"
                                        })
                                    }else{
                                        //retrieve the album data
                                        let albumData = await pool.query('SELECT * FROM albums WHERE user_id=$1 AND s3_album_image_key=$2 order by album_id desc limit 1', [userId, s3_audio_album_image_key])
                                       
                                       

                                        //loop through each song and associate album with song and upload
                                        
                                        for(let i = 0; i < musicFile.length; i++)
                                        {
                                            let s3_audio_key = uuidv4()
                                            let audio_params = {
                                                Bucket: "musicplayer-song",
                                                Body: musicFile[i].data,
                                                Key: s3_audio_key,
                                                ACL: "public-read"
                                            };

                                        
                                            //upload audio to s3
                                            await s3.upload(audio_params, (err, SongData) => {
                                                if(err)
                                                {
                                                    //todo: loop through album and delete all song within the album
                                                    deleteAlbumImageFromS3(s3_audio_album_image_key)
                                                    pool.query(`DELETE FROM albums WHERE user_id=$1 AND s3_album_image_key=$2`, 
                                                                [
                                                                    userId,
                                                                    s3_audio_album_image_key
                                                                ],(q_err, q_res) => {
                                                                    if(q_err) console.log(q_err)
                                                                })
                                                
                                                }
                                            }).send(async (err, SongData) => {
                                                let basic_info = JSON.parse(req.body.basic_info[i]) 

                                                const songValue = [
                                                    basic_info.title,
                                                    basic_info.selected_genre,
                                                    SongData.Location,
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
                                                    metadata.duration,
                                                    s3_audio_key,
                                                    albumData.rows[0].album_id
                                                ]
                                                
                                                //insert song
                                                await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                                    release_date,publisher
                                                                    ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                                    explicit_content,buy_link,album_title,duration,s3_audio_key,album_id)
                                                                    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
                                                                    ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                                    if (error) {
                                                                        console.log(error);
                                                                        deleteAudioFromS3(s3_audio_key)
                                                                        res.send({
                                                                            status: false,
                                                                            message: "Failed To Upload"
                                                                        })
                                                                    
                                                                    }else{
                                                                        if(i == (musicFile.length-1))
                                                                            console.log("Done With Uploading")
                                                                            return res.send({
                                                                                status: true,
                                                                                message: `Successfully Uploaded ${metadata.album_title} to UH Cloud!`
                                                                            })
                                                                    }
                                                                })
                                                
                                                
                                            })
                                        }

                                        
                                }})
                        })

        }else{
             
            let albumArtValue = [
                userId,
                metadata.release_date,
                metadata.artist,
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
                metadata.explicit_content
            ]

            //query to save the album image
             await pool.query(`INSERT INTO albums(user_id,release_date,artists,
                                publisher, ISRC, composer, release_title,
                                buy_link,album_title, record_label, barcode, ISWC, P_Line,
                                explicit_content)
                             VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
                             ON CONFLICT DO NOTHING`,albumArtValue, async (error, result)=> {
                if (error) {
                    console.log(error);
                    return res.send({
                        status: false,
                        message: "Failed To Upload"
                    })
                }else{
                    
                     pool.query(`SELECT * FROM albums WHERE user_id=$1 AND album_title=$2 order by album_id desc limit 1`, 
                                 [userId, metadata.album_title],
                                 async (error, albumDataRes) => {
                                 console.log("Uploading ALbum WIthout Image")
                                 if(error)
                                {
                                    await pool.query(`DELETE FROM albums 
                                        WHERE user_id=$1 AND 
                                        release_date=$2 AND
                                        artists=$3 AND
                                        publisher=$4 AND 
                                        ISRC=$5 AND
                                        composer=$6 AND 
                                        release_title=$7 AND
                                        buy_link=$8 AND
                                        album_title=$9 AND 
                                        record_label=$10 AND 
                                        barcode=$11 AND 
                                        ISWC=$12 AND 
                                        P_Line=$13 AND
                                        explicit_content=14`,
                                    albumArtValue, async (error, result)=> {
                                    if (error) {
                                        console.log("Failed to delete from psql album");
                                    }})

                                    console.log("error trying to grab album to insert into")
                                    return res.send({
                                        status: false,
                                        message: "Failed To Upload"
                                    })
                                 }

                            //if album doesn't have an image
                            for(let i = 0; i < musicFile.length; i++)
                            {
                                let s3_audio_key = uuidv4()
                                let audio_params = {
                                    Bucket: "musicplayer-song",
                                    Body: musicFile[i].data,
                                    Key: s3_audio_key,
                                    ACL: "public-read"
                                };
                
                                let basic_info = JSON.parse(req.body.basic_info[i]) 
                
                               

                                //upload audio to s3
                                await s3.upload(audio_params, (err, SongData) => {
                                
                                }).send(async (err, SongData) => {
                                    const songValue = [
                                        basic_info.title,
                                        basic_info.selected_genre,
                                        SongData.Location,
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
                                        metadata.duration,
                                        s3_audio_key,
                                        albumDataRes.rows[0].album_id
                                    ]
                                    
                                    //insert song
                                    await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                        release_date,publisher
                                                        ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                        explicit_content,buy_link,album_title,duration,s3_audio_key,album_id)
                                                        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
                                                        ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                        
                                                        if (error) {
                                                            console.log(error);
                                                            deleteAudioFromS3(s3_audio_key)
                                                            return res.send({
                                                                status: false,
                                                                message: "Failed To Upload"
                                                            })
                                                        
                                                        }else{
                                                            if(i == (musicFile.length-1)){
                                                                console.log("Done With Uploading")
                                                                return res.send({
                                                                    status: true,
                                                                    message: `Successfully Uploaded ${metadata.album_title} to UH Cloud!`
                                                                })
                                                            }
                                                        }
                                                    })
                                })
                            }
                        }
                    )
                   
                    
                    
            }})

            

        }

    }

    audio_image_File_To_Map = (audio_image_File) => {
        let map = {}        
        if(audio_image_File == undefined)
        {
            return;
        }
        else if(audio_image_File.name && audio_image_File.length == undefined)
        {
            map[audio_image_File.name] = audio_image_File
        }else{
            for(let i = 0; i < audio_image_File.length; i++)
            {
                if( map[audio_image_File.name])
                    continue
                else
                map[audio_image_File[i].name] = audio_image_File[i]
            }
        }

        return map
    }

    
    multiple_upload=async(req, res) => {
        let musicFile = req.files.musicUploads;  
        let audio_image_File = req.files.album_art;
        var userId = req.user.uid

        let imageMap = audio_image_File_To_Map(audio_image_File)
        
        const promise = new Promise(async (resolve, reject) => {
            for(let i = 0; i < musicFile.length; i++)
            {
            
                
                var metadata = JSON.parse(req.body.metadata[i]);
                var basic_info = JSON.parse(req.body.basic_info[i]);
                var s3_audio_album_image_key = uuidv4();
                var s3_audio_key = uuidv4();

            
                if(basic_info.song_image_name != null)
                {
                    //song with image
                    //store into s3
                    const audio_image_params = {
                        Bucket: "musicplayer-songart",
                        Body: imageMap[basic_info.song_image_name].data,
                        Key: s3_audio_album_image_key,
                        ACL: "public-read"
                    }

                    await s3.upload(audio_image_params, async (err, data) => {
                        if(err)
                        {
                            console.log("Error Trying To Upload Image To S3")
                            return res.send({status: false, message: "Failed" })
                        }
                    }).send(async (err, SongArt) => {
                        //upload song so s3
                        let audio_params = {
                            Bucket: "musicplayer-song",
                            Body: musicFile[i].data,
                            Key: s3_audio_key,
                            ACL: "public-read"
                        };

                        await s3.upload(audio_params, async(err, data)=> {
                            if(err)
                            {
                                deleteAudioImageFromS3(s3_audio_album_image_key)
                                console.log("Failed to upload song to s3")
                                return res.send({status: false, message: "Failed" })
                            }
                        }).send(async (err, SongData) => {
                            var basic_info = JSON.parse(req.body.basic_info[i]);
                            const songValue = [
                                basic_info.title,
                                basic_info.selected_genre,
                                SongData.Location,
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
                                metadata.duration,
                                s3_audio_key,
                                s3_audio_album_image_key,
                                SongArt.Location
                            ]
                            
                            //insert song
                            await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                                release_date,publisher
                                                ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                                explicit_content,buy_link,album_title,duration,s3_audio_key, s3_image_key, song_image)
                                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
                                                ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                                if (error) {
                                                    console.log(error);
                                                    deleteAlbumImageFromS3(s3_audio_album_image_key)
                                                    deleteAudioFromS3(s3_audio_key)
                                                    // return res.send({
                                                    //     status: false,
                                                    //     message: "Failed To Upload"
                                                    // })
                                                    reject("Fail")
                                                
                                                }else{
                                                    if(i == (musicFile.length-1)){
                                                        console.log("Done With Uploading")
                                                        resolve("Done")
                                                    }
                                                }
                                            })
                        })

                    })
                }else{
                    let audio_params = {
                        Bucket: "musicplayer-song",
                        Body: musicFile[i].data,
                        Key: s3_audio_key,
                        ACL: "public-read"
                    };

                    await s3.upload(audio_params, async(err, data)=> {
                        if(err)
                        {
                            console.log("Failed to upload song to s3")
                            return res.send({status: false, message: "Failed" })
                        }
                    }).send(async (err, SongData) => {
                        var basic_info = JSON.parse(req.body.basic_info[i]);
                        const songValue = [
                            basic_info.title,
                            basic_info.selected_genre,
                            SongData.Location,
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
                            metadata.duration,
                            s3_audio_key
                        ]
                        
                        //insert song
                        await pool.query(`INSERT INTO songs(title,genre,song_link,description,caption,user_id,
                                            release_date,publisher
                                            ,ISRC,composer,release_title,record_label,barcode,ISWC,P_Line,
                                            explicit_content,buy_link,album_title,duration,s3_audio_key)
                                            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
                                            ON CONFLICT DO NOTHING`,songValue, async (error, result)=> {
                                            if (error) {
                                                console.log(error);
                                                deleteAudioFromS3(s3_audio_key)
                                                return res.send({
                                                    status: false,
                                                    message: "Failed To Upload"
                                                })
                                            
                                            }else{
                                                if(i == (musicFile.length-1))
                                                {
                                                    console.log("Done With Uploading")
                                                    resolve("Done")
                                                }
                                                    
                                            }
                                        })
                    }) 
                }
            }
        })

        return promise
        
    }
    
    //single upload
    app.post('/api/single_audio_upload/', async (req, res) => {
        return music_upload_single(req, res)
    });

   

    //album upload
    app.post('/api/album_audio_upload/', async (req, res) => {
        return album_upload(req, res)
    })

    //multiple upload
    app.post('/api/mulitple_audio_upload/', async (req, res) => {
         multiple_upload(req, res).then(data=> {
             return res.send({
                 message:"Complete"
             })
         })
          
    })
}