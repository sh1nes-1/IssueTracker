import App from "../screens/App";
import auth_config from "../screens/auth/routes";

const routes = [
  {
    component: App,
    routes: [
      ...auth_config,
    ]
  }
];

export default routes;