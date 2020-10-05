import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import FlashMessage from './components/FlashMessage';
import { createTask, editTask, fetchTasksActions } from './actions';
//props.dispatch(fetchTasksActions());
const App = props => {
  useEffect(() => {
    props.dispatch(fetchTasksActions());
  }, []);
  const onCreateTask = ({ title, description }) => {
    props.dispatch(createTask({ title, description }));
  };

  const onStatusChange = (id, status) => {
    props.dispatch(editTask(id, { status }));
  };

  return (
    <div className='container'>
      {props.error && <FlashMessage message={props.error} />}
      <div className='main-content'>
        <TasksPage
          tasks={props.tasks}
          onCreateTask={onCreateTask}
          onStatusChange={onStatusChange}
          isLoading={props.isLoading}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);
