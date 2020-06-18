const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router
    .get('/', (req, res) => {
        Item.find()
            .sort({ date: -1 })
            .then(items => res.json(items))
    });

// @route POST api/items
// @desc Create A Item
// @access Private
router
    .post('/', auth, (req, res) => {
        const newItem = new Item({
            name: req.body.name,
            isCompleted: req.body.isCompleted
        });

        newItem.save().then(item => res.json(item));
    });

// @route PUT api/items/:id
// @desc Create A Item
// @access Private
router
    .put('/:id', auth, (req, res) => {
        let updatedItem = {
            name: req.body.name,
            isCompleted: req.body.isCompleted,
        }

        Item.findOneAndUpdate({ _id: req.params.id }, updatedItem, { useFindAndModify: false })
            .then((oldResult) => {
                Item.findOne({ _id: req.params.id })
                    .then((newResult) => {
                        res.json({ 
                            success: true, 
                            msg: 'Successfully updated!', 
                            result:{
                                _id: newResult._id,
                                name: newResult.name,
                                isCompleted: newResult.isCompleted
                            }
                        });
                    })
                    .catch(err => res.status(500).json({ success: false, msg: `Something went wrong. ${err}` })); 
            })
            .catch(err => {
                if(err.errors) {
                    if (err.errors.name) {
                        res.status(400).json({ success: false, msg: err.errors.name.message });
                        return;
                      }
                    if (err.errors.isCompleted) {
                        res.status(400).json({ success: false, msg: err.errors.isCompleted.message });
                        return;
                    }
                    // Show failed if all else fails for some reasons
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                }
            });
    });

// @route DELETE api/items/:id
// @desc Remove A Item
// @access Private
router
    .delete('/:id', auth, (req, res) => {
        Item.findById(req.params.id)
            .then(item => item.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ success: false }))
    });


module.exports = router;