import React from 'react'

function UserEditForm({ user: { id, firstName, lastName }}) {
  return (
    <div>
      <p>{`id: ${id}`}</p>
      <p>{`first name: ${firstName}`}</p>
      <p>{`last name: ${lastName}`}</p>
    </div>
  );
}

export default UserEditForm
