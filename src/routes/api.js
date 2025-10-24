const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validate = require('../middleware/validate');

// GET /api/health
router.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// GET /api/users
router.get('/users', usersController.list);

// GET /api/users/:id
router.get('/users/:id',
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  validate,
  usersController.getById
);

// POST /api/users
router.post('/users',
  body('name').isLength({ min: 2 }).withMessage('name must be at least 2 characters'),
  body('email').isEmail().withMessage('email must be valid'),
  validate,
  usersController.create
);

// PUT /api/users/:id
router.put('/users/:id',
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  body('name').optional().isLength({ min: 2 }),
  body('email').optional().isEmail(),
  validate,
  usersController.update
);

// DELETE /api/users/:id
router.delete('/users/:id',
  param('id').isInt({ min: 1 }),
  validate,
  usersController.remove
);

module.exports = router;
