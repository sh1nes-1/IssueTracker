import Login from "./Login/Login";
import Register from "./Register/Register";

const auth_config = [
  {
    path: ['/', '/login'],
    exact: true,
    component: Login
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
];

export default auth_config;