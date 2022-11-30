import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

// recipe requests
export const addRecipe = payload => api.post(`/addRecipe`, payload)
export const updateRecipe = (id, payload) => api.put(`/updateRecipe/${id}`, payload)
export const deleteRecipe = (id) => api.delete(`/deleteRecipe/${id}`)
export const getRecipe = id => api.get(`/recipe/${id}`)

// name requests
export const getName = id => api.get(`/name/${id}`)
export const getAllRecipeNames = () => api.get(`/names/all`)
export const getNamesByCategory = category => api.get(`/names/category/${category}`)

// ingredients requests
export const getIngredients = id => api.get(`/ingredients/${id}`)

// instruction requests
export const getInstructions = id => api.get(`/instructions/${id}`)

// search requests 
export const getRecipeByIngredient = queryString => api.get(`/search/ingredients/${queryString}`)

const apis = {
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getAllRecipeNames,
    getRecipe,
    getName,
    getNamesByCategory, 
    getIngredients,
    getInstructions,
    getRecipeByIngredient
}

export default apis