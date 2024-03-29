import HttpService from "services/HttpService";
import * as actionTypes from './actionTypes';

export function createProject(name) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });

      HttpService.post('/projects/', { name }, 
        () => dispatch({ type: actionTypes.CREATE_PROJECT_SUCCESS }), 
        () => dispatch({ type: actionTypes.CREATE_PROJECT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.CREATE_PROJECT_ERROR });
    }
  }
}

export function getProjects() {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_PROJECTS_REQUEST });

      HttpService.get('/projects/', null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_PROJECTS_SUCCESS, 
            projects: response.projects 
          });
        }, 
        () => dispatch({ type: actionTypes.GET_PROJECTS_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_PROJECTS_ERROR });
    }
  }
}

export function getProjectInfo(project_id) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.GET_PROJECT_INFO_REQUEST });

      HttpService.get(`/projects/${project_id}`, null, 
        (response) => {
          dispatch({ 
            type: actionTypes.GET_PROJECT_INFO_SUCCESS,
            project: response.project,
          })
        }, 
        () => dispatch({ type: actionTypes.GET_PROJECT_INFO_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.GET_PROJECT_INFO_ERROR });
    }
  }
}


export function updateProject(project_id, name) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });

      HttpService.post(`/projects/${project_id}`, { name }, 
        () => dispatch({ type: actionTypes.UPDATE_PROJECT_SUCCESS }), 
        () => dispatch({ type: actionTypes.UPDATE_PROJECT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.UPDATE_PROJECT_ERROR });
    }
  }
}

export function setProjectLocal(project) {
  return function (dispatch) {
    dispatch({ 
      type: actionTypes.SET_PROJECT_LOCAL,
      project: project, 
    });
  }
}

export function setProjectsLocal(projects) {
  return function (dispatch) {
    dispatch({ 
      type: actionTypes.SET_PROJECTS_LOCAL,
      projects: projects, 
    });
  }
}

export function deleteProject(project_id) {
  return function (dispatch) {
    try {
      dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });

      HttpService.delete(`/projects/${project_id}`,
        () => dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS }), 
        () => dispatch({ type: actionTypes.DELETE_PROJECT_FAIL })
      );

    } catch (error) {
      dispatch({ type: actionTypes.DELETE_PROJECT_ERROR });
    }
  }
}