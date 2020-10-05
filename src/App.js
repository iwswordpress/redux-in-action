import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import { createTask, editTask, updateTask } from './actions';

class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  onUpdateChange = (id, title, description, status) => {
    description = '!! ' + description;
    title = '!! ' + title;
    this.props.dispatch(updateTask(id, { status, description, title }));
  };
  render() {
    return (
      <div className='main-content'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>CH04CW</h1>
        </div>

        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onStatusChange={this.onStatusChange}
          onUpdateChange={this.onUpdateChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

export default connect(mapStateToProps)(App);
