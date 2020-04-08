import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../redux/actions/group';

interface CommentData {
  text: string;
}

interface CommentFormProps {
  groupId: string;
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ groupId, postId }) => {
  const [commentData, setCommentData] = useState<CommentData>({
    text: '',
  });
  const dispatch = useDispatch();

  const { text } = commentData;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCommentData({ ...commentData, [e.target.name]: e.target.value });

  return (
    <div>
      <h3>Add a comment</h3>
      <form
        className='commentform'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addComment(groupId, postId, {
              text,
            })
          );
          setCommentData({
            text: '',
          });
        }}
      >
        <textarea
          name='text'
          placeholder='Write your comment here'
          cols={30}
          rows={2}
          value={text}
          onChange={(e) => onChange(e)}
          required
        ></textarea>

        <button type='submit' className='registerbtn'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
