import User from '../models/user';

function load(req, res, next, id) {
    User.get(id).then((user) => {
        req.user = user;
        return next();
    }).error((e) => {
        next(e);
    });
}

function get(req, res) {
    User.findOne({ _id: req.params.userId }, (err, data) => {
        if (err)
            res.json(err);

        res.json(data);
    });
}

function update(req, res, next) {
    User.findByIdAndUpdate(req.params.userId, {
        $set: {
            username: req.body.username,
            name: req.body.name
        }
    }, (err, data) => {
        if(err)
            return res.json(err);

        return res.json(data);
    })
}

function remove(req, res, next) {
    const user = req.user;
    user.removeAsync()
        .then((deleteUser) => res.json(deleteUser))
        .error((e) => next(e));
}

function create(req, res, next) {
    const user = new User({
        username: req.body.username,
        name: req.body.name
    });

    user.saveAsync()
        .then((savedUser) => res.json(savedUser))
        .error((e) => next(e));
}

function list(req, res, next) {
    User.find({}, (err, data) => {
        if (err)
            res.json(err);

        res.json(data);
    });
}

export default {
    get,
    list,
    create,
    remove,
    update
};
