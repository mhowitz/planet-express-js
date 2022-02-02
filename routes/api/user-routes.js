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

routes.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Articles,
                attributes: ['id', 'title', 'post_url', 'category_id']
            }
        ]
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

routes.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        // req.session.save(() => {
        //     req.session.user_id= userData.id;
        //     req.session.username = userData.username;
        //     req.session.loggedIn = true;
        // })
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports= routes;