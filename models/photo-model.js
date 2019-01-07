let connection = require('./pandagram-connection')

class PhotoModel{
    constructor(){

    }

    getAll(callback){
        connection.query("SELECT * FROM foto",callback)
    }

    getPhotoById(photo_id,callback){
        connection.query("SELECT * FROM foto WHERE id = ?",photo_id,callback)
    }

    setPhoto(photo,callback){
        connection.query("INSERT INTO foto (title,src) VALUES(?,?)",[photo.title,photo.src],callback)
    }

    updatePhoto(photo,photo_id,callback){
        connection.query("UPDATE foto SET ? WHERE id = ? ",[photo,photo_id],callback)
    }

    deletePhoto(photo_id,callback){
        connection.query("DELETE FROM foto WHERE id = ? ",photo_id,callback)
    }
}

module.exports = PhotoModel
