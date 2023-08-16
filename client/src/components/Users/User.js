function User({ user }) {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
      {/* <td>
        <div className="user-action-container">
          <button className="action-button btn">Update Details</button>
          <button className="action-button btn">Reset Password</button>
          <button className="action-button btn">Delete</button>
        </div>
      </td> */}
    </tr>
  );
}

export default User;
