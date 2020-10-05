import * as api from '../api';

function fetchTasksSucceeded(tasks) {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks
    }
  };
}

function fetchTasksFailed(error) {
  return {
    type: 'FETCH_TASKS_FAILED',
    payload: {
      error
    }
  };
}

function fetchTasksStarted() {
  return {
    type: 'FETCH_TASKS_STARTED'
  };
}

export function fetchTasksActions() {
  return dispatch => {
    dispatch(fetchTasksStarted());

    fetch('https://49plus.co.uk/wp-social/wp-json/social/v2/get-tasks')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(fetchTasksSucceeded(data));
        dispatch(
          createTaskSucceeded({
            id: 1222,
            title: 'New Task in actions',
            description: 'TEST',
            status: 'NOT_STARTED'
          })
        );
      })
      .catch(error => dispatch(fetchTasksFailed(error)));
  };
}

function createTaskSucceeded(task) {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task
    }
  };
}

export function createTask({ title, description, status = 'NOT_STARTED' }) {
  return dispatch => {
    api.createTask({ title, description, status }).then(resp => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

function editTaskSucceeded(task) {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task
    }
  };
}

export function editTask(id, params = {}) {
  console.log(params.status);
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);
    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
    });
  };
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}
