import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_RECIPE } from "../../utils/mutations";
// import { QUERY_RECIPES } from "../../utils/queries";

import Auth from "../../utils/auth";

const RecipeForm = ({singleRecipe, handleToggle}) => {

  const [recipeFormData, setRecipeFormData] = useState({title: singleRecipe.title, servings: singleRecipe.servings, ingredients: singleRecipe.ingredients, instructions: singleRecipe.instructions, recipeId: singleRecipe.recipeId, createdBy: singleRecipe.createdBy});
  console.log(recipeFormData);
  const [validated] = useState('false');

  const [characterCount, setCharacterCount] = useState(0);

  const [createRecipe, { error }] = useMutation(CREATE_RECIPE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeFormData({ ...recipeFormData, [name]: value });
    setCharacterCount(value.length);

    // the ingredient list and instruction list will be longer than 280 characters.
    // Not currently worried about it.

    // if (name === "title" && value.length <= 280) {
    //   setRecipeFormData({ ...recipeFormData, [name]: value });
    //   setCharacterCount(value.length);
    // }
    // if (name === "servings" && value.length <= 3) {
    //   setRecipeFormData({ ...recipeFormData, [name]: value });
    //   setCharacterCount(value.length);
    // }
    // if (name === "ingredients" && value.length <= 1350) {
    //   setRecipeFormData({ ...recipeFormData, [name]: value });
    //   setCharacterCount(value.length);
    // }
    // if (name === "instructions" && value.length <= 1350) {
    //   setRecipeFormData({ ...recipeFormData, [name]: value });
    //   setCharacterCount(value.length);
    // }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    };

    const token = Auth.loggedIn() ? Auth.getToken() : null;  

    if(!token){return false;};
    try {
      const { data } = await createRecipe({
        variables: { personalRecipe: { ...recipeFormData }},
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setRecipeFormData({
      title: '',
      servings: '',
      ingredients: '',
      instructions: '',
    })

  };

  return (
    <section id={recipeFormData.recipeId} className="modal-container">
      {/* add back className create-recipe-modal */}
      <div id="id02" className="create-recipe-modal">
        <div className="modal-content animate-zoom recipe-card">
          <header className="modal-container modal-color">
            <span
              className="recipe-modal-btn topright"
              onClick={handleToggle}>
              &times;
            </span>
            <h3>Create a New Recipe</h3>
          </header>

          <p className="m-0" >
            Character Count: {characterCount}/280
          </p>

          <div className="modal-container">
            <form noValidate validated={validated}
              onSubmit={handleFormSubmit}
              className="flex-row justify-center justify-space-between-md align-center">
                  
              <div className="col-12 col-lg-9">
                <textarea
                  name="title"
                  placeholder="Title"
                  value={recipeFormData.title}
                  className="form-title w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                  required>
                </textarea>
                <textarea
                  name="servings"
                  placeholder="Servings"
                  value={recipeFormData.servings}
                  className="form-servings w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                  required>
                </textarea>
                <textarea
                  name="ingredients"
                  placeholder="Ingredients"
                  value={recipeFormData.ingredients}
                  className="form-ingredients w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                  required>
                </textarea>
                <textarea
                  name="instructions"
                  placeholder="Instructions"
                  value={recipeFormData.instructions}
                  className="form-instructions w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                  required>
                </textarea>
              </div>

              <div className="col-12 col-lg-3">
                <button
                  className="btn btn-primary btn-block py-3"
                  type="submit"
                >
                  Add Recipe
                </button>
              </div>
              {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeForm;
