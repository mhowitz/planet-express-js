const {User, Articles }= require('../../models');

const routes = require('express').Router();

routes.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports= routes;