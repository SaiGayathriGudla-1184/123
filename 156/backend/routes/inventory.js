const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get all inventory items
router.get('/', inventoryController.getAllItems);

// Add new inventory item
router.post('/', inventoryController.addItem);

// Update inventory item
router.put('/:id', inventoryController.updateItem);

// Delete inventory item
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;
