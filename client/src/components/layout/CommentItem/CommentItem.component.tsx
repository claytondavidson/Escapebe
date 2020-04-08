import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface CommentItemProps {
  comment: {
    text: string;
    username: string;
  };
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment: { text, username },
}) => (
  <Fragment>
    <div>
      <Link to={`/dashboard/${username}`}>
        <h4>{username}</h4>
      </Link>
    </div>
    <div>
      <p>{text}</p>
    </div>
  </Fragment>
);

export default CommentItem;
