import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateEditTask } from '../actions/index';
import { TASK_STATUSES } from '../constants';

const Task = props => {
  //console.log(props.task, props.dispatch);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);

  function toggleForm() {
    console.log('TOGGLE');
    setShowForm(!showForm);
    if (showAction == 'Edit') {
      showAction = 'Hide';
    } else if (showAction == 'hide') {
      showAction = 'Edit';
    }
  }

  function onTitleChange(e) {
    setTitle(e.target.value);
  }
  function onDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function updateForm(e) {
    e.preventDefault();
    console.log('EDIT clicked');
    const params = { title: title, description: description };
    props.dispatch(updateEditTask(props.task.id, params));
    toggleForm();
  }
  let showAction = 'Edit';
  return (
    <div className='task'>
      <div className='task-header'>
        <div>{props.task.title} </div>
      </div>

      <hr />
      <div className='task-body'>
        {props.task.description}
        <br></br>
      </div>
      <div className='task-body'>
        <button onClick={toggleForm}>{showForm ? 'Hide' : 'Edit'}</button>{' '}
        <select value={props.task.status} onChange={onStatusChange}>
          {TASK_STATUSES.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      {showForm && (
        <div style={{ padding: '5px' }}>
          <form className='new-task-form' onSubmit={updateForm}>
            <input
              className='full-width-input'
              onChange={onTitleChange}
              value={title}
              type='text'
              placeholder='title'
            />
            <input
              className='full-width-input'
              onChange={onDescriptionChange}
              value={description}
              type='text'
              placeholder='description'
            />
            <button className='button' type='submit'>
              Update
            </button>
            {'   '}
            <button
              onClick={toggleForm}
              className='button'
              style={{ background: 'red' }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );

  function onStatusChange(e) {
    props.onStatusChange(props.task.id, e.target.value);
  }
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}
export default connect(mapStateToProps, null)(Task);
