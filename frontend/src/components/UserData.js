import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserData({ id }) {
  const [name, setName] = useState('');
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      console.log(data);
      setName(data.name);
    };
    fetching();
  }, [id]);

  return <div>{name}</div>;
}

export default UserData;
