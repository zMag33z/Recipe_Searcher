// this was the saved books file.
// styling some how will need to be refactored.
// once adding a recipe is working we'll come back to this deleting styling after we ensure it's functionality.
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import View from '../components/modals/View';


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

const Dashboard = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteRecipe] = useMutation(REMOVE_RECIPE);
  const userData = data?.me || {};

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
<h1>OVERHAUL</h1>
      <PersonalRecipe />
    </>
  );
};

export default Dashboard;