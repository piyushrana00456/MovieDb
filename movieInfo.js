const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());


const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/MovieDb",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
}

const movieSchema=new mongoose.Schema({
    movie_name:String,
    movie_genre:String,
    production_year:Number,
    budget:Number
},{
    versionKey:false
})


const  Movie=mongoose.model("movies",movieSchema);

app.post("/movies",async function(req,res){
    const movie=await Movie.create(req.body);
    return res.send(movie);
})




app.get("/movies",async function(req,res){
    const movie=await Movie.find().lean().exec()
    return res.send(movie)
})

app.get("/movies/:movie_name",async function(req,res){
    const movie=await Movie.find({movie_name:"KingsMan"}).lean().exec()

    return res.send(movie)
})

app.patch("/movies/:id",async function(req,res){
    const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean();

    res.send(movie)
})

app.delete("/movies/:id",async function(req,res){
    const movie =await Movie.findByIdAndDelete(req.params.id).lean()
    res.send(movie)
})


app.listen(2345,async()=>{
   
    await connect();
    console.log("listening on port 2345");

})