export default function tasks(state = { tasks: [] }, action) {
  if (action.type === 'FETCH_TASKS_SUCCEEDD') {
    return {
      tasks: action.payload.tasks
    };
  }
  if (action.type === 'CREATE_TASK') {
    return {
      tasks: state.tasks.concat(action.payload)
    };
  }

  if (action.type === 'EDIT_TASK') {
    const { payload } = action;
    console.log('REDUCER/EDIT_TASK', action.type, payload);
    return {
      tasks: state.tasks.map(task => {
        if (task.id === payload.id) {
          console.log(task, payload.params);
          // return Object.assign({}, task, payload.params);
          return { ...task, status: payload.params.status };
        }

        return task;
      })
    };
  }

  if (action.type === 'UPDATE_TASK') {
    const { payload } = action;
    console.log('REDUCER/UPDATE_TASK:', action.type, payload);
    return {
      tasks: state.tasks.map(task => {
        if (task.id === payload.id) {
          console.log(`Updating TASK[${payload.id}]`);
          //console.log(task, payload.params);
          // return Object.assign({}, task, payload.params);
          const updatedTitle = 'UPDATED ' + payload.params.title;
          return {
            ...task,
            status: 'Completed',
            title: updatedTitle,
            description: 'UPDATED ' + payload.params.description
          };
        }

        return task;
      })
    };
  }
  if (action.type === 'UPDATE_EDIT_TASK') {
    const { payload } = action;
    console.log(payload);
    console.log('REDUCER/UPDATE_TASK:', action.type, payload);
    return {
      tasks: state.tasks.map(task => {
        if (task.id === payload.id) {
          console.log(`UPDATE_EDIT_TASK: TASK[${payload.id}]`);

          return {
            ...task,
            title: payload.params.title,
            description: payload.params.description
          };
        }

        return task;
      })
    };
  }
  return state;
}
