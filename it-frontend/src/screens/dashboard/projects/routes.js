import CreateProject from "./create/CreateProject";
import Projects from "./Projects";

const projects_config = [
  {
    key: "projects",
    path: "/dashboard/projects",
    exact: true,
    component: Projects
  },
  {
    key: "projects",
    path: "/dashboard/projects/create",
    exact: true,
    component: CreateProject
  }  
];

export default projects_config;