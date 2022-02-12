const routes = require('express').Router();
const { Articles, User, Comment, Category } = require('../models');

routes.get('/', (req, res) => {

    res.render('profile', { 
        Articles,
        loggedIn: true })
})



module.exports = routes;