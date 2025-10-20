const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();


const authorizeRole = (roles) => (req, res, next) => {
    
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente.' });
    }
    next();
};

router.post(
    '/:role',
    authMiddleware.protect,
    authorizeRole(['professor', 'admin']), 
    userController.create
);


router.get(
    '/:role',
    authMiddleware.protect,
    authorizeRole(['professor', 'admin']),
    userController.findAllByRole
);


router.put(
    '/:role/:id',
    authMiddleware.protect,
    authorizeRole(['professor', 'admin']),
    userController.update
);


router.delete(
    '/:role/:id',
    authMiddleware.protect,
    authorizeRole(['professor', 'admin']),
    userController.remove
);

module.exports = router;