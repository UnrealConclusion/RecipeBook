import pymongo

myClient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myClient["recipesDB"]

ingredientCol = mydb["recipeIngredients"] # collection contains the ingredients and quantity of all the recipes


print(ingredientCol.find_one({
    "ingredients": [
            "chicken, broilers or fryers, wing, meat and skin, raw",
            "salt, table",
            "spices, pepper, black",
            "oil, olive, salad or cooking",
            "butter, without salt",
            "sauce, hot chile, sriracha",
            "honey",
            "rice, white, long-grain, regular, unenriched, cooked without salt",
            "soy sauce made from soy (tamari)",
            "sauce, hoisin, ready-to-serve",
            "salt, table",
            "spices, coriander seed"
        ]
}))

print(ingredientCol.find_one({
    "ingredients": { "$regex": "&"}
}))