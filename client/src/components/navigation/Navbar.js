import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import SignUpForm from '../../components/forms/SignupForm';
import LoginForm from '../../components/forms/LoginForm';

import Auth from '../../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='md'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Recipe Searcher
          </Navbar.Brand>
         
          <Navbar.Toggle aria-controls='navbar ' />
          <Navbar.Collapse id='navbar' className='flex-row-reverse'>
            <Nav className='align-items-end'>
              <Nav.Link as={Link} to='/'>
                Search for Recipes!
              </Nav.Link>
              {/* <Nav.Link as={Link} to='/create'>
                Create a Recipe!
              </Nav.Link> */}
              <Nav.Link as={Link} to='/about'>
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to='/contact'>
                Contact Us
              </Nav.Link>
              {/* if user is logged in show saved recipes and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/dashboard'>
                    {Auth.getProfile().data.username}'s Dashboard
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;