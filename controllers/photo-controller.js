let PhotoModel = require('../models/photo-model'),
    formidable = require('formidable'),
    photoModel = new PhotoModel(),
    fs = require('fs')

class PhotoController{
    constructor(){

    }

    getAll(req,res,next){
        photoModel.getAll((err,rows)=>{
            let locals={
                title: 'Inicio',
                data: rows
            }

            if(err) throw err
            
            res.render('index',locals)            
        })
    }

    getAddSection(req,res,next){
        res.render('add',{
            title: 'Add photo'
        })
    }

    getEditSectionByPhoto(req,res,next){
        photoModel.getPhotoById(req.params.photo_id,(err,photo)=>{
            let locals={
                title: 'Inicio',
                data: photo[0]
            }

            res.render('edit',locals)
        })
    }

    setPhoto(req,res,next){
        let form = formidable.IncomingForm(),
            photo = {}

        //setting upload directory
        form.uploadDir = './public/img/photos'

        form
            .parse(req,(err,fields,files)=>{
            
            })
            .on('field',(name,value)=>{
                //cuando un campo ha llegado por completo
                photo.title = value;
            })
            .on('fileBegin',(name,file)=>{
                //cuando se detecta la llegada de un archivo pero aun se esta cargando en el buffer
                file.path = form.uploadDir + '/' + file.name
            })
            .on('file',(name,file)=>{
                //cuando un archivo ha llegado por completo
                photo.src = file.name;
            })
            .on('end',()=>{
                //cuando se completo todo la data proveniente de un formulario
                photoModel.setPhoto(photo,(err)=>{
                    if(err) throw err
                    return (err) ? res.redirect("/add") : res.redirect("/")    
                })
            })
    }

    updatePhoto(req,res,next){
        let photo_id = req.params.photo_id, 
            photo = {
                title: req.body.title
            }
        
        photoModel.updatePhoto(photo,photo_id,(err)=>{
            if(err){
                console.log(err)
                res.redirect("/edit/"+photo_id)
            }else
                res.redirect("/")
        })
    }

    deletePhoto(req,res,next){
        let photo_id = req.params.photo_id, 
            photo_src =  req.params.photo_src
        
        photoModel.deletePhoto(photo_id,(err)=>{
            if(err)
            console.log(err) 
            else {
                //deleting image
                fs.unlink('./public/img/photos/' + photo_src,(err)=>{
                    return (err) ? console.log(err) : console.log('File '+photo_src+' was deleted') 
                })
                res.redirect("/")
            }
        })
    }
}

module.exports = PhotoController