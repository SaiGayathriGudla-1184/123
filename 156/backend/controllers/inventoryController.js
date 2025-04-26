const Inventory = require('../models/Inventory');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addItem = async (req, res) => {
  const { name, quantity, description } = req.body;

  try {
    const newItem = new Inventory({
      name,
      quantity,
      description,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, description } = req.body;

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { name, quantity, description },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Inventory.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
