import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment: { text, username } }) => (
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

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
