const mongoose=require('mongoose');
const shortid=require('shortid')

const shortURLSchema=mongoose.Schema({
    fullURL:{
        type:String,
        required:true
    },
    shortURL:{
        type:String,
        required: true,
        default: shortid.generate
    }
})

const ShortURL=mongoose.model('ShortURL',shortURLSchema)

module.exports=ShortURL;