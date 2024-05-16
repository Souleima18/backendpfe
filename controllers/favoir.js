const Favoir = require('../models/favoir');

exports.ajouterProduit = async (req, res) => {
    const { userId, produitId } = req.body;
    try {
        // Trouver le panier de l'utilisateur en fonction de son ID
        let panier = await Favoir.findOne({ user: userId });

        // Si l'utilisateur n'a pas de panier, créer un nouveau panier
        if (!panier) {
            panier = new Favoir({
                user: userId,
                produits: [{ produit: produitId }]
            });
        } else {
            const existingProduct = panier.produits.find(
                item => item.produit.toString() === produitId
            );

            if (existingProduct) {
                return res.status(400).json({ message: 'Le produit est déjà dans le favoris.' });
            }
            panier.produits.push({ produit: produitId });
        }
        await panier.save();

        res.status(201).json(panier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du produit au favoris.' });
    }
};

exports.getFavoritesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const favorites = await Favoir.find({ user: userId }).populate('produits.produit');
        res.status(200).json(favorites.map(fav => fav.produits).flat());
    } catch (error) {
        console.error('Error fetching favorite products:', error);
        res.status(500).json({ message: 'Error fetching favorite products' });
    }
};


exports.supprimerProduit = async (req, res) => {
    try {
        const { userId, produitId } = req.params;

        const panier = await Favoir.findOne({ user: userId });

        if (!panier) {
            return res.status(404).json({ message: 'Favoris non trouvé.' });
        }

        panier.produits = panier.produits.filter(item => item.produit.toString() !== produitId);

        await panier.save();

        res.status(200).json({ message: 'Produit supprimé du favoris avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit du favoris.' });
    }
};


