import React, { useEffect } from 'react';
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
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">
          Sidebar Nav
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul
            className="navbar-nav mr-auto sidenav"
            id="navAccordion"
            style={{ marginLeft: '-2px' }}
          >
            {userInfo ? (
              <li
                className="nav-item active text-center"
                style={{ background: '#333' }}
              >
                <a className="nav-link" href="/profile">
                  <img
                    src={userInfo.pic}
                    alt="user"
                    className="rounded-circle"
                    style={{ width: '100px' }}
                  />
                  <br />
                  {userInfo.name}
                </a>
              </li>
            ) : (
              ''
            )}
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/userList">
                User List <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/userActivity">
                User Activity <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/profile">
                User Details <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <form className="form-inline ml-auto mt-2 mt-md-0">
            {userInfo ? (
              <button
                className="btn btn-danger"
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
      <main className="content-wrapper">
        <div className="container-fluid ">
          {title && <></>}
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
