// should implement actions file for mutations and queries
import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const SAVE_RECIPE = gql`
  mutation saveRecipe(
    $newRecipe: RecipeInput!
  ) {
    saveRecipe(
      newRecipe: $newRecipe
    ) {
      _id
      username
      recipeCount
      savedRecipes {
        recipeId
        title
        servings
        ingredients
        instructions
      }
    }
  }
`;


export const REMOVE_RECIPE = gql`
  mutation removeRecipe(
    $recipeId: ID!
  ) {
    removeRecipe(
      recipeId: $recipeId
    ) {
      username
      recipeCount
      savedRecipes {
        recipeId
        title
        servings
        ingredients
        instructions
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $personalRecipe: PRecipeInput!
    ) {
      createRecipe(
        personalRecipe: $personalRecipe
      ) {
        recipeId
        title
        servings
        ingredients
        instructions
        createdBy
    }
  }
`;

// CREATE UPDATE USER'S SAVED RECIPES ARRAY
export const USER_RECIPE_UPDATE = gql`
  mutation userRecipeUpdate(
    $updateUserRecipe: RecipeInput!
  ) {
    userRecipeUpdate(
      updateUserRecipe: $updateUserRecipe
    ) {
      _id
      username
      recipeCount
      savedRecipes {
        recipeId
        title
        servings
        ingredients
        instructions
      }
    }
  }
`;


export const ADD_DONATION = gql`
  mutation addDonation(
    $donation: DonationInput!
  ) {
    addDonation(
      donation: $donation
    ) {
      fullname
      email
      amount
    }
  }
`;