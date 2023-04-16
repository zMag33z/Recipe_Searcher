const { gql } = require("apollo-server-express");

// need to redefine UserRecipe to go to model and not to User's save array
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
    createRecipe( personalRecipe: PRecipeInput! ): PersonalRecipe
    addDonation( name: String!, amount: String!, message: String!): User
  }
`;

module.exports = typeDefs;