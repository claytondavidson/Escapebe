import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../redux/actions/group';

const PostForm = ({ groupId, addPost }) => {
  const [postData, setPostData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = postData;

  const onChange = e =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  return (
    <div>
      <h3>Add a post</h3>
      <form
        className='postform'
        onSubmit={e => {
          e.preventDefault();
          addPost(groupId, {
            title,
            text
          });
          setPostData({
            title: '',
            text: ''
          });
        }}
      >
        <textarea
          name='title'
          placeholder='Post title'
          value={title}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <textarea
          name='text'
          placeholder='Write your post here'
          cols='30'
          rows='2'
          value={text}
          onChange={e => onChange(e)}
          required
        ></textarea>

        <button type='submit' className='registerbtn'>
          Add Post
        </button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
