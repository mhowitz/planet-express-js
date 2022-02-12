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
        req.session.save(() => {
            req.session.user_id= userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
        })
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

routes.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userData => {
        if(!userData) {
            res.status(400).json({ message: 'No user found with this email address.' })
        return;
        }
        const validPass = userData.checkPassword(req.body.password);
        if(!validPass) {
            res.status(400).json({ message: 'Wrong Password, try again!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Now logged in!' })
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

routes.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            console.log('logged out');
            res.status(204).end();
        });
    } else {
        res.status(404).end();
        console.log("you are already logged out")
    }
    // console.log(req.session.loggedIn);
});

routes.put('/:id', (req, res) => {
//expects username, email, password
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

routes.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'No user found with this id! ' });
            return;
        }
        res.json(userData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});





module.exports= routes;