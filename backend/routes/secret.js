const express = require('express')
const jwt = require('jsonwebtoken')
const Secret = require('../models/Secret');

const router = express.Router();

const authenticate = (req, res, next) =>{
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({error: 'Access denied. No token provided.'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({error:'Invalid token'})
    }
}

router.post('/', authenticate, async (req, res) =>{
    try{
        const newSecret = new Secret({title: req.body.title, content: req.body.content});
        await newSecret.save();
        res.status(201).json(newSecret);
    }catch(error){
        res.status(400).json({error: error.message});
    }
})

router.get('/', authenticate, async (req, res) =>{
    try {
        const secrets = await Secret.find().sort({createdAt: -1});
        res.json(secrets);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;