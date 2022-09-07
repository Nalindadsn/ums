import React, { useEffect } from 'react';
import { Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
function Header({ setSearch, location, history }) {
  const locationn = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const logoutHandler = () => {
  //   dispatch(logout());
  // };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="white"
      style={{ marginLeft: '170px', border: '0' }}
    >
      <Container>
        {userInfo && locationn.pathname.substring(1) === 'userList' && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="float-right ml-5">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
