import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGroup } from '../../../redux/actions/group';

const GroupForm = ({ createGroup }) => {
  const [groupData, setGroupData] = useState({
    title: '',
    description: ''
  });

  const { title, description } = groupData;

  const onChange = e =>
    setGroupData({ ...groupData, [e.target.name]: e.target.value });

  return (
    <div>
      <h3>Create a group</h3>
      <form
        className='groupform'
        onSubmit={e => {
          e.preventDefault();
          createGroup({
            title,
            description
          });
          setGroupData({
            title: '',
            description: ''
          });
        }}
      >
        <textarea
          name='title'
          placeholder='Name your group'
          value={title}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <textarea
          name='description'
          placeholder='Write a group description'
          cols='30'
          rows='2'
          value={description}
          onChange={e => onChange(e)}
          required
        ></textarea>

        <button type='submit' className='registerbtn'>
          Create Group
        </button>
      </form>
    </div>
  );
};

GroupForm.propTypes = {
  createGroup: PropTypes.func.isRequired
};

export default connect(null, { createGroup })(GroupForm);
