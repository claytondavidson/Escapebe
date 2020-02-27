import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner.component';
import { getGroups } from '../../../redux/actions/group';

const Groups = ({ getGroups, group: { groups, loading } }) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return <div></div>;
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(Groups);
