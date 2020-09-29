const express=require('express');
const mongoose=require('mongoose');
const ShortURL=require('./models/ShortURL');
const bodyParser=require('body-parser');

const app=express();
const Port=process.env.PORT || 5000;
const dbURI="mongodb+srv://fuzzy:1234@cluster0.o2xxz.mongodb.net/url_shortner_db?retryWrites=true&w=majority"

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('url shortener service is live! :)')
})
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        app.listen(5000,()=>{
            console.log(`App running on port ${Port},connected to db`)
        })
    })

app.post('/shorten',async(req,res)=>{
    console.log('req body: ',req.body)
    const result=await ShortURL.create({
        fullURL:req.body.fullURL
    })
    res.send(result)
    
})

app.get('/:shortUrl',async(req,res)=>{
    const shortURL=req.params.shortUrl;
    //console.log(shortURL)
    const shorturl=await ShortURL.findOne({shortURL})
    if(!shorturl) return res.status(404).json({msg:'404 Not Found'});
    shorturl.save();
    console.log("short: ",shorturl)
    res.redirect(shorturl.fullURL)
})

