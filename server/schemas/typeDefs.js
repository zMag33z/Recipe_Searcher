const { gql } = require("apollo-server-express");

// CREATE TYPEDEF FOR UPDATE USER SAVED ARRAY
const typeDefs = gql`
  input RecipeInput {
    recipeId: String!
    title: String!
    servings: String!
    ingredients: String!
    instructions: String!
  }

  input PRecipeInput {
    recipeId: String!
    title: String!
    servings: String!
    ingredients: String!
    instructions: String!
    createdBy: String!
  }

  input DonationInput {
    fullname: String!
    email: String!
    amount: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    recipeCount: Int
    savedRecipes: [UserRecipe]
  }

  type UserRecipe {
    recipeId: ID!
    title: String!
    servings: String!
    ingredients: String!
    instructions: String!
  }

  type PersonalRecipe {
    recipeId: ID!
    title: String!
    servings: String!
    ingredients: String!
    instructions: String!
    createdBy: String!
  }

  type DonationList {
    fullname: String!
    email: String!
    amount: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(newRecipe: RecipeInput!): User
    removeRecipe(recipeId: ID!): User
    createRecipe(personalRecipe: PRecipeInput!): PersonalRecipe
    userRecipeUpdate(updateUserRecipe: RecipeInput!): User
    addDonation(donation: DonationInput!): DonationList
  }
`;


module.exports = typeDefs;