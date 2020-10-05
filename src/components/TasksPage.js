import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Loading from './Loading';
import { fetchTasksActions } from '../actions';
import { TASK_STATUSES } from '../constants';

const TasksPage = props => {
  console.log(props);
  useEffect(() => {}, [props.tasks]);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setShowNewCardForm(false);
    setTitle('');
    setDescription('');
  };

  const onCreateTask = e => {
    e.preventDefault();
    props.onCreateTask({
      title: title,
      description: description
    });
    resetForm();
    props.reload();
  };

  const toggleForm = () => {
    setShowNewCardForm({ showNewCardForm: !showNewCardForm });
  };

  if (props.isLoading) {
    return (
      <div
        style={{
          marginTop: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        {' '}
        <button className='button button-default' onClick={toggleForm}>
          + New task
        </button>
      </div>
      {showNewCardForm && (
        <form className='new-task-form' onSubmit={onCreateTask}>
          <input
            name='title'
            className='full-width-input'
            onChange={e => setTitle(e.target.value)}
            value={title}
            type='text'
            placeholder='title'
          />
          <input
            name='description'
            className='full-width-input'
            onChange={e => setDescription(e.target.value)}
            value={description}
            type='text'
            placeholder='description'
          />
          <button className='button' type='submit'>
            Save
          </button>
        </form>
      )}
      <div className='task-lists'>
        {TASK_STATUSES.map(status => {
          const statusTasks = props.tasks.filter(
            task => task.status === status
          );
          return (
            <TaskList
              key={status}
              status={status}
              tasks={statusTasks}
              onStatusChange={props.onStatusChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TasksPage;
