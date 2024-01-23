const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: ""
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUESTED
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users
  };
};

const fetchUserFailure = (err) => {
  return {
    type: FETCH_USER_FAILURE, 
    payload: err
  };
};

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchUser = () => {
  return function(dispatch) { 
    dispatch(fetchUserRequest());
    axios.get('https://jsonplaceholder.typicode.com/users') 
      .then(response => {
        const users = response.data.map(user => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

const store = createStore(fetchUserReducer,applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log('updatedState', store.getState())); 
store.dispatch(fetchUser());
