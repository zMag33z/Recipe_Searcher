const { Schema } = require('mongoose');

// This is a subdocument schema, goes to the User's array of savedRecipes
const userRecipeSchema = new Schema(
  {
    recipeId: {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    servings: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
  }
);



module.exports = userRecipeSchema;