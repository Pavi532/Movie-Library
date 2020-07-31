const express = require('express');
const Director = require('../models/director');
const router = express.Router(); 

//All directors 

router.get('/', async(req,res) =>{ //directors/
    let searchOptions = {
        name:""
    };
    let searchName;
    if (req.query.name != null && req.query.name !== ''){
        searchName = req.query.name.trim();
        console.log(searchName);
        searchOptions.name = new RegExp(searchName, "i");
        console.log(searchOptions.name);
    }
    try {
        const directors = await Director.find(searchOptions);
        res.render("directors/index",{
            directors:directors,
            searchOptions: req.query
        });
        console.log(directors);
    } catch (error) {
        res.redirect('/');
    }
});

//New director show
router.get('/new', (req, res) => { //directors/new
    res.render('directors/new', {director: new Director()});
});

//New director create
router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name,
        tmdb_id: req.body.tmdb_id,
        imdb_id: req.body.imdb_id
    });
    try {
        const newDirector =  await director.save();
        // res.redirect(`directors/${newDirector.id}`);
        console.log("WORKS")
        res.redirect(`directors`);
    } catch (error) {
        res.render('directors/new',{
                director: director, //repopulate the fields so they can see what they entered
                errorMessage: "An error occured while adding director"
        });
    }
});



module.exports = router;