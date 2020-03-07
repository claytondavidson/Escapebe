import React, { Fragment, useEffect, useState } from 'react';
import { getGroups } from '../../redux/actions/group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GroupSearch = ({ getGroups, group: { groups } }) => {
  const searchGroups = async searchText => {
    let matches = groups.filter(group => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return group.title.match(regex);
    });

    if (searchText.length === 0) {
      matches = [];
    }

    console.log(matches);
  };

  return (
    <Fragment>
      <div>
        <input placeholder='search for groups' />
      </div>
    </Fragment>
  );
};

GroupSearch.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(GroupSearch);
