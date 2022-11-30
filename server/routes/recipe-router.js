/**
 * Router for Recipe Queries 
 */
const express = require('express')
const recipeCtrl = require('../controllers/recipe-ctrl')
const router = express.Router()

// recipe requests
router.post('/addRecipe', recipeCtrl.addRecipe) 
router.put('/updateRecipe/:id', recipeCtrl.updateRecipe) 
router.delete('/deleteRecipe/:id', recipeCtrl.deleteRecipe)
router.get('/recipe/:id', recipeCtrl.getRecipe)

// name requests
router.get('/name/:id', recipeCtrl.getName)
router.get('/names/all', recipeCtrl.getAllNames)
router.get('/names/category/:category', recipeCtrl.getNamesByCategory)

// ingredients requests
router.get('/ingredients/:id', recipeCtrl.getIngredients)

// instruction requests
router.get('/instructions/:id', recipeCtrl.getInstructions)

// search requests 
router.get('/search/ingredients/:queryString', recipeCtrl.searchByIngredients)

module.exports = router