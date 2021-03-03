import Issues from "./list/Issues";
import Details from "./details/Details";
import EventInfo from "./details/event/Info";

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
    component: Details,
    routes: [
      {
        key: "issues",
        path: "/dashboard/issues/:id/events/:eventId",
        component: EventInfo,
      }
    ]    
  }
];

export default issues_config;