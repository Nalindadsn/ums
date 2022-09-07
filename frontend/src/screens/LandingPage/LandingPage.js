import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './LandingStyles.css';

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/userList');
    }
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return <div className=""></div>;
}

export default LandingPage;
