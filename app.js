const express = require('express');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blogSchema');
const { result } = require('lodash');
// express app
const app = express();
const db = "mongodb+srv://osekafore:09075199063@cluster0.mmun2jx.mongodb.net/Node?retryWrites=true&w=majority"; 
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology:true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err)) 



app.set('view engine','ejs');
// rendering static files eg css
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'))
app.use((req, res, next) =>{
    console.log('morgan');
    console.log('host:', req.hostname);
    next();
})
app.use((req, res, next) =>{
    console.log('morgan');
    next();
})
app.use((req, res, next) =>{
    console.log( res.locals.path = req.path);
    next();
})
///////////testing db
app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title:'new blog 2',
        snippet: 'About new blog',
        body:'more about new blog'
    })
    blog.save().then(result =>{
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    })
});
app.get('/all-blogs', (req,res) =>{
    Blog.find().then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
})
app.get('/single-blog', (req, res) =>{
    Blog.findById('655204636fa3176345eb216b')
    .then((result) => {  
        res.send(result);
    })
    .catch((err) => {
        console.log(err); 
    })
});
//////////////----------////////
// app.get('/',(reg,res) => {
//     const blogs =[
//         {title: 'Node js Class', snippet:
//         'jhgutfjdjfuhgearjhvurejhf'},
//         {title: 'Node at Hiit', snippet:
//         'dfhurtuhfdhutyufhbiowoei'},
//         {title: 'Osekafore nodejs', snippet:
//         'gfhkutjhgutyrgkltrduihgutu'},
    
//     ];
//     res.render('index',{title: 'Home', blogs})
// })
app.get('/', (req, res) =>{
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.render('about',{title: 'about'})
})

app.get('/blogs/create', (req, res)=> {
    res.render('create', {title:' Create new blog'})
});
app.get('/blogs', (req, res) =>{
    Blog.find().then(result =>{
        res.render('index', {blogs: result, title: 'All blogs'})
    }).catch(err => {
        console.log(err);
    })
});
app.post('/blogs', (req, res) =>{
    console.log(req.body);
    const blog = new Blog(req.body)
    blog.save().then(result => {
        res.redirect('/blogs')
    }).catch(err => {
        console.log(err);
    })
});
app.get('/blogs/:id', (req,res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('detail', {blog : result, title: 'Blog Detail'})
        
    })
    .catch(err => {
            console.log(err);
        });    
})

app.delete('/blogs/:id', (req,res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => res.json({redirect: '/blogs'}))
    .catch(err => console.log(err))
}) 

app.use((req,res) => {
    res.status(404).render('404', {title: 'page not found '});
})
//



    // console.log('connected sucessully');
    // app.get('/', (req,res)=>{
        // res.sendFile('./views/index.html',{root: __dirname})
    // res.send('<p>This is my about page</p>')
    // })

    // app.get('/about', (req,res)=>{
        // res.sendFile('./views/about.html',{root: __dirname})
    // res.send('<p>This is my about page</p>')
    // })

    // app.get('/about-us', (req,res)=>{
        // res.send('<p>This is my about page</p>')
        // res.redirect('/about')
        // })

        // page
        // app.use((req,res) =>{
            // res.send('<p>page not found</p>')
        // res.status(404).sendFile('./views/404.html',{root: __dirname})

        // })

 

    

