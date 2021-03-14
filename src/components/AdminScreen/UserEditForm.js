import React from 'react'

function UserEditForm({ user: { id, firstName, lastName, email }}) {
  return (
    <div>
      <p>{`id: ${id}`}</p>
      <p>{`first name: ${firstName}`}</p>
      <p>{`last name: ${lastName}`}</p>
      <p>{`email: ${email}`}</p>
    </div>
  );
}

export default UserEditForm
