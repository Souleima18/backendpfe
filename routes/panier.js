const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panier');

router.post('/ajouterProduit', panierController.ajouterProduit);
router.delete('/supprimer/:userId/:produitId', panierController.supprimerProduit);
router.get('/user/:userId', panierController.getPanierByUser );
module.exports = router;
