const { Schema, model } = require('mongoose');


// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedRecipes` array in User.js
const personalRecipeSchema = new Schema(
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  }
);

const PersonalRecipe = model('PersonalRecipe', personalRecipeSchema);

module.exports = PersonalRecipe;