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

const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().collection('users').insertOne(user);
        
        if (response.acknowledged) {
            res.status(201).json({
                message: 'User created successfully',
                userId: response.insertedId,
                user: user
            });
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error while creating user' });
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Failed to delete user or user not found' });
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error while deleting user' });
    }
};
 
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};