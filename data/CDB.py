import os.path
import pymongo
import json

myClient = pymongo.MongoClient("mongodb://localhost:27017/")

# drop database if already exist 
if "recipesDB" in myClient.list_database_names():
    myClient.drop_database("recipesDB")
    print("droping recipesDB")

# open the recipes.json file
recipesData = json.loads(open(os.path.join(os.path.dirname(__file__), 'recipes.json'), "r").read())

# create the database
mydb = myClient["recipesDB"]

# create a name collection and insert all recipie names 
nameCol = mydb["recipeNames"] # collection contains the names of all the recipes
ingredientCol = mydb["recipeIngredients"] # collection contains the ingredients and quantity of all the recipes
instructionCol = mydb["recipeInstructions"] # collection contains the instructions of the recipes


recipe = recipesData[0]
id = nameCol.insert_one({"name": recipe["title"], "category": "dessert"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[1]
id = nameCol.insert_one({"name": recipe["title"], "category": "dessert"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[2]
id = nameCol.insert_one({"name": recipe["title"], "category": "appetizer"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[3]
id = nameCol.insert_one({"name": recipe["title"], "category": "lunch"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[4]
id = nameCol.insert_one({"name": recipe["title"], "category": "dessert"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[11]
id = nameCol.insert_one({"name": recipe["title"], "category": "lunch"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[14]
id = nameCol.insert_one({"name": recipe["title"], "category": "dinner"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[21]
id = nameCol.insert_one({"name": recipe["title"], "category": "dinner"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[31]
id = nameCol.insert_one({"name": recipe["title"], "category": "lunch"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[125]
id = nameCol.insert_one({"name": recipe["title"], "category": "breakfast"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

recipe = recipesData[552]
id = nameCol.insert_one({"name": recipe["title"], "category": "lunch"}).inserted_id
ingredientCol.insert_one({"_id": id, "ingredients": [ingredient["text"] for ingredient in recipe["ingredients"]], "quantitys": [quantity["text"] for quantity in recipe["quantity"]], "units": [unit["text"] for unit in recipe["unit"]]})
instructionCol.insert_one({"_id": id, "instructions": [instruction["text"] for instruction in recipe["instructions"]]})

print(nameCol.find_one({"_id": id}))
print(ingredientCol.find_one({"_id": id}))
print(instructionCol.find_one({"_id": id}))
