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
        //console.log(data);
        dispatch(fetchTasksSucceeded(data));
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

export function createTask({ title, description }) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);

  let apiUrl = 'https://49plus.co.uk/wp-social/wp-json/social/v2/add-task';
  console.log('url: ' + apiUrl);
  // USE FETCH API
  fetch(apiUrl, {
    method: 'POST', // set FETCH type GET/POST, if none specified GET is default
    body: formData // append form data
  })
    .then(function (response) {
      console.log(response);
      return response.json(); // convert stream response tot text
    })
    .then(function (data) {
      console.log(data);
    });

  return dispatch => {
    dispatch(createTaskSucceeded({ title, description }));
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
  console.log('EDIT TASK', id, params);
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);

    const formData = new FormData();
    formData.append('status', 'COMPLETED');
    formData.append('id', id);

    let apiUrl = 'https://49plus.co.uk/wp-social/wp-json/social/v2/edit-task';
    console.log('url: ' + apiUrl);
    // USE FETCH API
    fetch(apiUrl, {
      method: 'POST', // set FETCH type GET/POST, if none specified GET is default
      body: formData // append form data
    })
      .then(function (response) {
        console.log(response);
        return response.json(); // convert stream response tot text
      })
      .then(function (data) {
        console.log(data);
      });
  };
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}
