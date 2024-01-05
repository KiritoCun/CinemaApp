const initialState = {
  isLoggedIn: false,
  customer: null,
  token: '',
  // customer: {dayofbirth: "dayofbirth 1", email: "a@gmail.com", sex: 45, id: "1", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/800px-Unknown_person.jpg", name: "name 1", password: "123", phone: "phone 1"},
};

const authReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        customer: payload.customer,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        customer: null,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: payload.token,
      };
    default:
      return state;
  }
};

export default authReducer;