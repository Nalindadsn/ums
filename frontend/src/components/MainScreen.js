import React, { Fragment, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './Screen.css';

import { logout } from '../actions/userActions';
function MainScreen({ children, title }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {}, [userInfo]);

  return (
    <div className="">
      {' '}
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">
          Sidebar Nav
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto sidenav" id="navAccordion">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/userList">
                User List <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/userActivity">
                User Activity <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/profile">
                User Details <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <form class="form-inline ml-auto mt-2 mt-md-0">
            {userInfo ? (
              <button
                class="btn btn-danger"
                type="submit"
                onClick={logoutHandler}
              >
                LOGOUT
              </button>
            ) : (
              ''
            )}
          </form>
        </div>
      </nav>
      <main class="content-wrapper">
        <div class="container-fluid ">
          {title && <></>}
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
