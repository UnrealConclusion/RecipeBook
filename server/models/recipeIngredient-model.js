/** 
 * Model for the ingredients of a recipe
*/
const mongoose = require('mongoose')

const Ingredient = new mongoose.Schema({
    ingredients: [String], // the names of each ingredient stored in an array
    quantitys: [String], // the quantiys of each ingredients required by the recipe stored in an array
    units: [String] // the unit that the quantity of each ingredient is measured in stored in an array
})

module.exports = mongoose.model('recipeIngredients', Ingredient, 'recipeIngredients')