const { User, PersonalRecipe, DonationList } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
// configure stripe here on server side USING CHECKOUT user fills out form for donation then donation checkout opens if info wrong user can close the box refill their form and resubmit action

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedRecipes");

        return userData;
      }
      // throw new AuthenticationError("You are not logged in");
    },
  },

  Mutation: {
    // pull args from user input to login user
    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email });

      // check username
      if (!user) {
        throw new AuthenticationError("username/password is incorrect");
      }
      // retrieve and check user password behind the curtain
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("username/password is incorrect");
      }
      console.log('RESOLVER login assigning token now...');
      // all pass assign token to user.
      const token = signToken(user);
      return { token, user };
    },
    // pull args from user input to create user then turn user to receive token then return user and token as value
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      console.log('RESOLVER addUser assigning token now...');
      const token = signToken(user);
      return { token, user };
    },
    // pull user input from args and add to set return new true
    saveRecipe: async (parent, { newRecipe}, context) => {

      console.log('RESOLVER saveRecipe', newRecipe);

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: newRecipe } },
          { new: true }
        ).populate('savedRecipes');

        
        return updatedUser;
      }
      // throw new AuthenticationError("You must be logged in!");
    },
    // pull recipe id from args to remove
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedRecipes: { recipeId: recipeId } } },
          { runValidators: true, new: true }
        ).populate("savedRecipes");

        return updatedUser;
      }
      // throw new AuthenticationError("You must be logged in!");
    },
    // REFACTOR this code NOW to receive input from client side
    createRecipe: async (parent, { personalRecipe }, context) => {
      // creating new personal recipe

      console.log('RESOVLER createRecipe');

      let newRecipeID;
      try {
        const newRecipeData = await PersonalRecipe.create(personalRecipe);
        newRecipeID = newRecipeData._id;
      } catch (err) {
        console.error(err);
      }
      // adding new personal recipe id to user
      try {
        const newUserData = await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: { createdRecipes: newRecipeID }},
          { runValidators: true, new: true }
        );
        console.log('CREATED ARRAY', newUserData);
      } catch (err) {
        console.error(err);
      }
    },
    userRecipeUpdate: async (parent, { updateUserRecipe }, context) => {
      //CREATE NEW MUTATION BELOW FOR THIS CODE.
      console.log('RESOLVER userRecipeUpdate', updateUserRecipe, context.user._id);
      try {
        const updatedRecipeData = await User.findOneAndUpdate(
          { _id: context.user._id, savedRecipes: { $elemMatch: { recipeId: updateUserRecipe.recipeId } }},
          { $set: {
            "savedRecipes.$.title": updateUserRecipe.title,
            "savedRecipes.$.servings": updateUserRecipe.servings,
            "savedRecipes.$.ingredients": updateUserRecipe.ingredients,
            "savedRecipes.$.instructions": updateUserRecipe.instructions,
            }
          },
          { runValidators: true, new: true }
        ).populate("savedRecipes");

        console.log('UPDATED', updatedRecipeData);

      } catch (err) {
        console.error(err);
      }
    },
        // create a query to function donation form
    // example use from 22.24 change for personal usecase
    
    addDonation: async (parent, { donation }, context) => {

      console.log(donation);

    },
  },
};

module.exports = resolvers;