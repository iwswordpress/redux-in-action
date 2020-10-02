import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../actions/index';
import { TASK_STATUSES } from '../constants';

const Task = props => {
  //console.log(props.task, props.dispatch);
  return (
    <div className='task'>
      <div className='task-header'>
        <div>
          {props.task.title}{' '}
          <button
            onClick={() => {
              console.log('CLICK');
              props.dispatch(updateTask(props.task.id, props.task));
            }}
          >
            SET IN PROGRESS
          </button>
        </div>
        <select value={props.task.status} onChange={onStatusChange}>
          {TASK_STATUSES.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className='task-body'>{props.task.description}</div>
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
