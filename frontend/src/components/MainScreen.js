import React, { Fragment } from 'react';
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
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Item 1
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-collapse"
                href="#"
                id="hasSubItems"
                data-toggle="collapse"
                data-target="#collapseSubItems2"
                aria-controls="collapseSubItems2"
                aria-expanded="false"
              >
                Item 2
              </a>
              <ul
                class="nav-second-level collapse"
                id="collapseSubItems2"
                data-parent="#navAccordion"
              >
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span class="nav-link-text">Item 2.1</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span class="nav-link-text">Item 2.2</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Item 3
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-collapse"
                href="#"
                id="hasSubItems"
                data-toggle="collapse"
                data-target="#collapseSubItems4"
                aria-controls="collapseSubItems4"
                aria-expanded="false"
              >
                Item 4
              </a>
              <ul
                class="nav-second-level collapse"
                id="collapseSubItems4"
                data-parent="#navAccordion"
              >
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span class="nav-link-text">Item 4.1</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span class="nav-link-text">Item 4.2</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span class="nav-link-text">Item 4.2</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Item 5
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main class="content-wrapper">
        <div class="container-fluid bg-dark">
          gg-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          {title && <></>}
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
