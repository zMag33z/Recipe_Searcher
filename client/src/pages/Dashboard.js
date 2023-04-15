// styling some how will need to be refactored.
// once adding a recipe is working we'll come back to this deleting styling after we ensure it's functionality.
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';


import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import create personal recipe form
import PersonalRecipe from '../components/forms/PersonalRecipe';

// here are the personal styling file for this page.
import '../styles/Dashboard.css';

import { GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';


// implement useState so when recipe deleted it will update the appearance of the page
const Dashboard = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteRecipe] = useMutation(REMOVE_RECIPE);
  const userData = data?.me || {};

  const [recipeData, setRecipeData] = useState({ recipeId: '', title: '', servings: '', ingredients: '', instructions: ''});

  const [show, setShow] = useState(false);

  const handleEditRecipe = async (recipeId) => {
    const thisRecipe = await userData.savedRecipes.filter(recipe => recipe.recipeId === recipeId);
    console.log('handle edit\n', ...thisRecipe);
    setRecipeData(...thisRecipe);
    setShow(!show);
  };

  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;  

    if(!token){return false;};

    try{
      await deleteRecipe({
        variables: { recipeId },
      });

      removeRecipeId(recipeId);
    }catch(err){
      console.log(err);
    };
  };

  if(loading){return <h2>loading now...</h2>};

  // RESTRUCTURE THE LAYOUT OF THIS PAGE AND BE LESS LIKE HOMEPAGE AND A REAL DASHBOARD
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>{Auth.getProfile().data.username}'s Viewer/Editor</h1>
          <p>Welcome!</p>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved Recipes!'}
        </h2>
        <Row>
          {userData.savedRecipes.map((recipe) => {            
            return (
              <Col key={recipe.recipeId} md="4">
                <Card border='dark'>
                  {/* DIDN'T REALIZE COMPLETELY BUT    ABOVE I WAS ALREAD GATHERING ALL DATA. can refactor with recipeData variable above */}
                  <Card.Body id={recipe.recipeId} data-title={recipe.title} data-servings={recipe.servings} data-ingredients={recipe.ingredients} data-instructions={recipe.instructions}>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>Servings: {recipe.servings}</p>
                    <Card.Text>{recipe.ingredients}</Card.Text>
                    <Card.Text>{recipe.instructions}</Card.Text>
                    <button className="recipe-modal-btn modal-color" onClick={(e) => {                      
                      // document.getElementById('id02').style.display='block';

                      // document.querySelector('.form-title').value = e.target.parentElement.dataset.title;
                      // document.querySelector('.form-servings').value = e.target.parentElement.dataset.servings;
                      // document.querySelector('.form-ingredients').value = e.target.parentElement.dataset.ingredients;
                      // document.querySelector('.form-instructions').value = e.target.parentElement.dataset.instructions;
                      handleEditRecipe(recipe.recipeId);
                      }}>Edit Recipe</button>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                    {userData.savedRecipes?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
                          ? 'Recipe Deleted!'
                          : 'Delete this Recipe!'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {show ? <PersonalRecipe singleRecipe={recipeData}/> : null}
    </>
  );
};

export default Dashboard;

