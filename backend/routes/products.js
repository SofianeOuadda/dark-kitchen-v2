const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth'); 

// Récupère les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des produits.' });
  }
});

// Récupère un produit par ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du produit.' });
  }
});

// Création d'un nouveau produit
router.post('/', auth, async (req, res) => {
  const { name, description, price, image, category, ingredients, available } = req.body;
  try {
    let product = await Product.findOne({ name });
    if (product) {
      return res.status(400).json({ message: 'Un produit avec ce nom existe déjà.' });
    }

    product = new Product({
      name,
      description,
      price,
      image,
      category,
      ingredients,
      available,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du produit.' });
  }
});

// Mise à jour d'un produit existant 
router.put('/:id', auth, async (req, res) => {
  const { name, description, price, image, category, ingredients, available } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.image = image || product.image;
    product.category = category || product.category;
    product.ingredients = ingredients || product.ingredients;
    product.available = available !== undefined ? available : product.available;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du produit.' });
  }
});

// Suppression d'un produit
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    res.json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du produit.' });
  }
});

module.exports = router;
