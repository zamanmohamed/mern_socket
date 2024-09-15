const express = require('express');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

const router = express.Router();

const itemRoutes = (io) => {
  router.get('/', getItems);
  router.post('/', createItem(io));
  router.put('/:id', updateItem(io));
  router.delete('/:id', deleteItem(io));

  return router;
};

module.exports = itemRoutes;
