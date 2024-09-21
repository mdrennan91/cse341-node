const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('users').find();
        const users = await result.toArray();
        console.log('Users fetched:', users);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
        const user = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user[0]);
    } catch (err) {
        console.error('Error fetching single user:', err);
        res.status(500).send('Error fetching single user');
    }
};

module.exports = {
    getAll,
    getSingle
};