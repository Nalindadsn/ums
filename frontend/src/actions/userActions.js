import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (
    name,
    email,
    password,
    pic,
    userId,
    nic,
    dob,
    phone,
    gender,
    maritalStatus,
    userType
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        {
          name,
          pic,
          email,
          password,
          userId,
          nic,
          dob,
          phone,
          gender,
          maritalStatus,
          userType,
        },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/users/profile', user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/list`, config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUserAction =
  (id, name, email, userId, nic, dob, gender, MaritalStatus, phone, userType) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/${id}`,
        {
          name,
          email,
          userId,
          nic,
          dob,
          gender,
          MaritalStatus,
          phone,
          userType,
        },
        config
      );

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const listUsersAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/listAdmin`, config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    });
  }
};

export const listUsersCustomer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/listCustomer`, config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    });
  }
};

export const listUsersBoatOwner = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/listBoatOwner`, config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    });
  }
};

export const listUsersInventoryManager = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/listInventoryManager`, config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    });
  }
};
