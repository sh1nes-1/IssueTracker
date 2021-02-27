import Issues from "./list/Issues";
import Details from "./details/Details";

const issues_config = [
  {
    key: "issues",
    path: "/dashboard/issues",
    exact: true,
    component: Issues
  },
  {
    key: "issues",
    path: "/dashboard/issues/:id/",
    exact: true,
    component: Details
  }
];

export default issues_config;