import React, { Fragment, useState } from 'react';
import RenderResults from './RenderResults.component';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GroupSearch = () => {
  const groups = useSelector((state: any) => state.group.groups);
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState([]);

  const searchGroups = (text) => {
    const regex = new RegExp(`^${text}`, 'gi');
    let matches = groups.filter((group) => group.title.match(regex));
    text.length === 0 ? setMatches([]) : setMatches(matches);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    searchGroups(e.target.value);
  };

  return (
    <Fragment>
      <input
        placeholder='Search for groups'
        value={search}
        onChange={handleSearchChange}
      />
      <div className='groups'>
        {matches.map((match) => (
          <Dropdown.Item
            id='dropdownId'
            key={match._id}
            as={Link}
            to={`/group/${match._id}`}
            style={{ backgroundColor: 'white' }}
          >
            <RenderResults key={match._id} group={match} />
          </Dropdown.Item>
        ))}
      </div>
    </Fragment>
  );
};

export default GroupSearch;
