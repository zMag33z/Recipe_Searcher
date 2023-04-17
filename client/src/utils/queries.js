// should implement actions file for mutations and queries
import { gql } from '@apollo/client';


// FINISH add donation query to go to checkout with info
// export const GET_ME = gql`
//   {
//     me {
//       _id
//       username
//       recipeCount
//       email
//       savedRecipes {
//         recipeId
//         title
//         servings
//         ingredients
//         instructions
//       }
//     }
//   }
// `;

export const GET_ME = gql`
  query getMe{
    me {
      _id
      username
      recipeCount
      email
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

// FIX THIS QUERY FOR CALL TO HOMEPAGE SEARCHGPT FOR ALL USERS TO VIEW
// export const QUERY_RECIPES = gql`
//   {
//     recipes {
//       _id
//       recipeText
//       author
//       createdAt
//       commentCount
//       comments {
//         _id
//         commentText
//         createdAt
//         username
//       }
//     }
//   }
// `;

