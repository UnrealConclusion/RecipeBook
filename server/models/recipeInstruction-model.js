/** 
 * Model for the instructions of a recipe
*/

const mongoose = require('mongoose')

const Instruction = new mongoose.Schema({
    instructions: [String], // each step of instructions stored in an array
    
})

module.exports = mongoose.model('recipeInstructions', Instruction, 'recipeInstructions')