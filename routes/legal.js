const express = require('express');
const router = express.Router();
const Case = require('../models/Cases');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getallcases',authMiddleware, async (req, res) => {
    try {
        const cases = await Case.find({user_id:req.userId });
        res.status(200).json(cases);        
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getcase/:id',authMiddleware, async (req, res) => {
    try {
        const cases = await Case.findById(req.params.id);
        res.status(200).json(cases);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/createcase',authMiddleware, (req, res) => {
    try {
        const { name, description } = req.body;
        const newCase = new Case({ name, description, user_id: req.userId });
        newCase.save();
        res.status(201).json(newCase);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/updatecase/:id',authMiddleware, async (req, res) => {
    try {
       const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body);
       res.status(200).json(updatedCase);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/deletecase/:id',authMiddleware, async (req, res) => {
    try {
        const deletedCase = await Case.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCase);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/addNewDate/:id',authMiddleware, async (req, res) => {
    try {
        const { date, description } = req.body;
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, { $push: { dates: { date, description } } });
        res.status(200).json(updatedCase);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
