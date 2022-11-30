/** 
 * Model for the name and category of a recipe
*/

const mongoose = require('mongoose')
const Name = new mongoose.Schema({
    name: String, // the name of the recipe
    category: String // the category that it belongs to 
})
module.exports = mongoose.model('recipeNames', Name, 'recipeNames')