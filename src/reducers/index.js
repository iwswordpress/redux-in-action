import { uniqueId } from '../actions';

const mockTasks = [
  {
    id: uniqueId(),
    title: 'Learn Redux',
    description: 'CW The store, actions, and reducers, oh my!',
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
  console.log('ORIGINAL State: ', state.tasks);
  console.log(action.type, action.payload);
  console.log('CURRENT State: ', state.tasks);
  if (action.type === 'CREATE_TASK') {
    const { payload } = action;

    return {
      tasks: state.tasks.concat(action.payload)
    };
  }

  if (action.type === 'EDIT_TASK') {
    const { payload } = action;
    if (payload.params) {
      console.log(payload.params);
    }

    return {
      tasks: state.tasks.map(task => {
        if (task.id === payload.id) {
          // return Object.assign({}, task, payload.params);
          return [...task, payload.params];
        }

        return task;
      })
    };
  }

  return state;
}
