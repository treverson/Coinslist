var express = require("express"),
    router = express.Router(),
    xrpListing = require('../models/xrpListing'),
    middleware = require('../middleware');


//XRP Routes
router.get('/listings/xrp', function(req, res){
xrpListing.find({}, function(err, allxrpListings){
    if(err){
        console.log(err);
    } else {
        res.render('listings/xrp.ejs', {xrpListings: allxrpListings, currentUser: req.user, page: 'xrpListings'})
    }
})
});

router.get('/listings/xrp/new', middleware.isLoggedIn, function(req, res){
res.render("listings/xrpNew");
});

router.post('/listings/xrp', middleware.isLoggedIn, function(req, res){
    //Get data from form and add new listings array
    var title = req.body.title;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newListing = {title: title, price: price, description: desc, author: author};
    //Create and save to DB
    xrpListing.create(newListing, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Listing posted successfully!");
            res.redirect("/listings/xrp");
        }
    })
});


module.exports = router;