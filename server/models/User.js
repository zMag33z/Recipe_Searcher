const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from User saved U-Recipe.js
const userRecipeSchema = require('./U-Recipe');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedRecipes to be an array of data that adheres to the recipeSchema
    savedRecipes: [userRecipeSchema],
    createdRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PersonalRecipe'
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password  NOTATE: wonder if i can use the next functionality to added donator to list after checkout submission
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `recipeCount` with the number of saved recipes we have
userSchema.virtual('recipeCount').get(function () {
  return this.savedRecipes.length;
});

const User = model('User', userSchema);

module.exports = User;