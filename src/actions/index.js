let _id = 1;
export function uniqueId() {
  return _id++;
}

export function createTask({ title, description }) {
  return {
    type: 'CREATE_TASK',
    payload: {
      id: uniqueId(),
      title,
      description,
      status: 'Unstarted'
    }
  };
}

export function editTask(id, params = {}) {
  return {
    type: 'EDIT_TASK',
    payload: {
      id,
      params
    }
  };
}

export function updateTask(id, params = {}) {
  console.log('actions/updateTask', id);
  return {
    type: 'UPDATE_TASK',
    payload: {
      id,
      params
    }
  };
}

export function updateEditTask(id, params = {}) {
  console.log('actions/updateEditTask', id);
  return {
    type: 'UPDATE_EDIT_TASK',
    payload: {
      id,
      params
    }
  };
}
