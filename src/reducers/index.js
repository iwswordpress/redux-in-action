import { uniqueId } from '../actions';

const mockTasks = [
  {
    id: uniqueId(),
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'Unstarted'
  },
  {
    id: uniqueId(),
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress'
  }
];

export default function tasks(state = { tasks: mockTasks }, action) {
  if (action.type === 'CREATE_TASK') {
    return {
      tasks: state.tasks.concat(action.payload)
    };
  }

  if (action.type === 'EDIT_TASK') {
    const { payload } = action;
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

  return state;
}
