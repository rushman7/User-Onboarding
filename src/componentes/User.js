import React from 'react';

const User = props => {
  const { first_name, email, last_name, occupation  } = props.user;
  return (
    <div>
      <p>Name: {first_name} {last_name}</p>
      <p>Email: {email}</p>
      {occupation && <p>{occupation}</p>}
    </div>
  )
}

export default User