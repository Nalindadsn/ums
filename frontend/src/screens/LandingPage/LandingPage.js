import React, { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LandingStyles.css';

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if (userInfo) {
    //   history.push('/userList');
    // }
    // if (!userInfo) {
    //   history.push('/login');
    // }
  }, [history, userInfo]);

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
          gg
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          {/* {title && (
            <>
              <h1 className="heading">{title}</h1>
              <hr />
            </>
          )}
          {children} */}
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
