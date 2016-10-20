const router = require('express').Router();

// clients controller
const controller = require('../controllers/students');

// propietary routes

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
