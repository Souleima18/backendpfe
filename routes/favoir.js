const express = require('express');
const router = express.Router();
const favoirController = require('../controllers/favoir');

router.post('/ajouterProduit', favoirController.ajouterProduit);
router.delete('/supprimer/:userId/:produitId', favoirController.supprimerProduit);
router.get('/user/:userId', favoirController.getFavoritesByUser);
module.exports = router;
