const Item = require("../models/itemModel");

const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

const createItem = (io) => async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  io.emit("itemCreated", newItem); // Emit event
  res.json(newItem);
};

const updateItem = (io) => async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  io.emit("itemUpdated", updatedItem); // Emit event
  res.json(updatedItem);
};

const deleteItem = (io) => async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  io.emit("itemDeleted", deletedItem); // Emit event
  res.json(deletedItem);
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
