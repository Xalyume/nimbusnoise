import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import css from './UserList.module.css'

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}
      className={css.user_link}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <fieldset className={css.userlist_container}>
      <legend className={css.userlist_legend}>User List: </legend>
      <ul>{userComponents}</ul>
    </fieldset>
  );
}

export default UsersList;
