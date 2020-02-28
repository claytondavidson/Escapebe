import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../Spinner/Spinner.component';
import { getPost } from '../../../redux/actions/group';

const Post = ({ getPost, post, loading, match }) => {
  useEffect(() => {
    getPost(match.params.group_id, match.params.post_id);
  }, [getPost, match.params.group_id, match.params.post_id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        {post.comments &&
          post.comments.map(comment => (
            <div className='comment'>
              <div>
                <Link to={`/dashboard/${comment.member}`}>
                  <h4>{comment.username}</h4>
                </Link>
              </div>
              <p>{comment.text}</p>
              <p>
                Posted on <Moment format='MM/DD/YYYY'>{comment.date}</Moment>
              </p>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

//<CommentItem key={comment._id}></CommentItem>

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  post: state.group.post
});

export default connect(mapStateToProps, { getPost })(Post);
