import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { upvotePost } from '../../../redux/actions/group';

const PostItem = ({
  groupId,
  post: { _id, username, member, title, text, upvotes, comments, date },
  showComments,
}) => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className='group'>
        <div>
          <Link to={`/dashboard/${member}`}>
            <h4>{username}</h4>
          </Link>
        </div>
        <p>{title}</p>
        <p>{text}</p>
        {/*
          <button
            onClick={() => dispatch(upvotePost(groupId, _id))}
            type='button'
            className='btn btn-light'
          >
            {' '}
            <i className='fas fa-thumbs-up'></i>{' '}
            <span> {upvotes.length > 0 && <span>{upvotes.length}</span>} </span>{' '}
          </button>
        */}
        <p>
          Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </p>
        <Link to={`/group/${groupId}/${_id}`} className='button'>
          {showComments && (
            <Fragment>
              {comments.length === 1
                ? `${comments.length} comment`
                : `${comments.length} comments`}
            </Fragment>
          )}
        </Link>
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showComments: true,
};

PostItem.propTypes = {
  groupId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
};

export default PostItem;
