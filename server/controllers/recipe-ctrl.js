/**
 * Recipe Queries 
 */
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectId
const recipeNames = require('../models/recipeName-model')
const recipeIngredients = require('../models/recipeIngredient-model')
const recipeInstructions = require('../models/recipeInstruction-model')

/** ---------- Recipe Requests ---------- **/

// add a new recipe to the database 
addRecipe = (req, res) => {
    const body = req.body

    // check to make sure that the body is not empty 
    if (!Object.keys(body).length){
        return res.status(400).json({
            success: false,
            error: "add recipe: body of request is empty!",
        })
    }

    // create objects
    const name = new recipeNames({"name": body.name, "category": body.category})
    const ingredients = new recipeIngredients({"_id": name.id, "ingredients": body.ingredients, "units": body.units, "quantitys": body.quantitys})
    const instructions = new recipeInstructions({"_id": name._id, "instructions": body.instructions})

    // save recipe to database 
    try{
        name.save()
        ingredients.save()
        instructions.save()
    }
    catch(err){
        return res.status(400).json({
            success: false,
            error: "add recipe: " + err
        })
    }

    // return id of new recipe 
    return res.status(201).json({
        success: true,
        id: name._id,
        message: 'Recipe Added!',
    })
}

// update a recipe by ID
updateRecipe = (req, res) => {
    const body = req.body

    // check to make sure that the body is not empty 
    if (!Object.keys(body).length){
        return res.status(400).json({
            success: false,
            error: "update recipe: body of request is empty!",
        })
    }

    // update name
    recipeNames.findById(req.params.id).then(function(name){
        name.name = body.name
        name.category = body.category
        name.save()
    })

    // update ingredients
    recipeIngredients.findById(req.params.id).then(function(ingredients){
        ingredients.ingredients = body.ingredients
        ingredients.units = body.units
        ingredients.quantitys = body.quantitys
        ingredients.save()
    })

    // update instructions
    recipeInstructions.findById(req.params.id).then(function(instructions){
        instructions.instructions = body.instructions
        instructions.save()
    })

    return res.status(201).json({
        success: true,
        id: req.params.id,
        message: 'Recipe Updated!',
    })
}

// delete a recipe by id 
deleteRecipe = async (req, res) => {
    await recipeNames.findOneAndDelete({ _id: req.params.id })
    await recipeIngredients.findOneAndDelete({ _id: req.params.id })
    await recipeInstructions.findOneAndDelete({ _id: req.params.id })

    return res.status(201).json({
        success: true,
        id: req.params.id,
        message: 'Recipe Deleted!',
    })
}

// get recipe name, ingredients, and instructions by id
getRecipe = async(req, res) => {
    
    // check that the id is valid 
    if (!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({ 
            success: false, 
            error: "get recipe: invalid id" 
        })
    }

    return await recipeNames.aggregate(
        [   
            {
                $match:
                {
                    _id: ObjectID(req.params.id)
                }
            },
            {
                $lookup:
                {
                    from: "recipeIngredients",
                    localField: "_id",
                    foreignField: "_id",
                    as: "ingredients"
                }
            },
            {
                $lookup:
                {
                    from: "recipeInstructions",
                    localField: "_id",
                    foreignField: "_id",
                    as: "instructions"
                }
            },
            {
                $project:
                {
                    "name": "$name",
                    "category": "$category",
                    "ingredients": "$ingredients.ingredients",
                    "quantitys": "$ingredients.quantitys",
                    "units": "$ingredients.units",
                    "instructions": "$instructions.instructions"
                }
            },
            {
                $unwind: "$ingredients"
            },
            {
                $unwind: "$quantitys"
            },
            {
                $unwind: "$units"
            },
            {
                $unwind: "$instructions"
            }
        ]
    )
    .then(function(recipe, err){
        
        // check that a recipe was found
        if (!recipe.length){
            return res.status(404).json({ 
                success: false, 
                error: `get recipe: recipe not found!` 
            })
        }

        return res.status(200).json({ success: true, data: recipe})
    })
}

/** ---------- Name Requests ---------- **/

// get recipe name by id 
getName = async(req, res) => {
    return await recipeNames.findById(req.params.id).then(function(name, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!name){
            return res.status(404).json({ success: false, error: `Name not found` })
        }
        return res.status(200).json({ success: true, data: name})
    }).catch(err => console.log(err))
}

// get all recipe names
getAllNames = async(req, res) => {
    return await recipeNames.find(
        {}
    ).then(function(recipeNames, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipeNames.length) {
            return res.status(404).json({ success: false, error: `No Recipes!` })
        }
        return res.status(200).json({ success: true, data: recipeNames})
    }).catch(err => console.log(err))
}

// get all recipe names
getNamesByCategory = async(req, res) => {
    return await recipeNames.find(
        {category: req.params.category}
    ).then(function(recipeNames, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipeNames.length) {
            return res.status(404).json({ success: false, error: `No Recipes!` })
        }
        return res.status(200).json({ success: true, data: recipeNames})
    }).catch(err => console.log(err))
}


// get ingredients by id
getIngredients = async(req, res) => {
    return await recipeIngredients.findById(req.params.id).then(function(ingredients, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ingredients){
            return res.status(404).json({ success: false, error: `Ingredients not found` })
        }
        return res.status(200).json({ success: true, data: ingredients})
    }).catch(err => console.log(err))
}

// get instructions by id
getInstructions = async(req, res) => {
    return await recipeInstructions.findById(req.params.id).then(function(instructions, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!instructions){
            return res.status(404).json({ success: false, error: `Instructions not found` })
        }
        return res.status(200).json({ success: true, data: instructions})
    }).catch(err => console.log(err))
}

// get recipes by ingredients 
searchByIngredients =  async(req, res) => {
    regex = req.params.queryString.split("&")
    for (i=0; i<regex.length; i++){
        regex[i] = "(" + regex[i] + ")"
    }
    regex = regex.join("|")
    return await recipeIngredients.aggregate(
        [   
            {
                $match:
                {
                    ingredients: { $regex: regex }
                }
            },
            {
                $lookup:
                {
                    from: "recipeNames",
                    localField: "_id",
                    foreignField: "_id",
                    as: "name"
                }
            },
            {
                $project:
                {
                    "name": "$name.name",
                    "ingredients": "$ingredients"
                }
            },
            {
                $unwind: "$name"
            }
        ]
    )
    .then(function(recipe, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipe){
            return res.status(404).json({ success: false, error: `Search Fail` })
        }
        return res.status(200).json({ success: true, data: recipe})
    })
}

/*
getRecipeByIngredient =  async(req, res) => {
    regex = req.params.queryString.split("&").join("|")
    return await recipeIngredients.find({
        ingredients: { $regex: regex }
    })
    .then(function(recipe, err){
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipe){
            return res.status(404).json({ success: false, error: `Search Fail` })
        }
        return res.status(200).json({ success: true, data: recipe})
    })
}
 */
module.exports = {
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,

    getAllNames,
    getNamesByCategory,
    getName,
    
    getIngredients,
    
    getInstructions,

    searchByIngredients
}