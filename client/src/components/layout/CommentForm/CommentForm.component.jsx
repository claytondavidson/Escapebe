import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../redux/actions/group';

const CommentForm = ({ groupId, postId, addComment }) => {
  const [commentData, setCommentData] = useState({
    text: ''
  });

  const { text } = commentData;

  const onChange = e =>
    setCommentData({ ...commentData, [e.target.name]: e.target.value });

  return (
    <div>
      <h3>Add a comment</h3>
      <form
        className='commentform'
        onSubmit={e => {
          e.preventDefault();
          addComment(groupId, postId, {
            text
          });
          setCommentData({
            text: ''
          });
        }}
      >
        <textarea
          name='text'
          placeholder='Write your comment here'
          cols='30'
          rows='2'
          value={text}
          onChange={e => onChange(e)}
          required
        ></textarea>

        <button type='submit' className='registerbtn'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
