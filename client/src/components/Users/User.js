function User() {
  return (
    <tr>
      <td>johndoe1</td>
      <td>John</td>
      <td>Doe</td>
      <td>Admin</td>
      <td>
        <div className="user-action-container">
          <button className="action-button btn">Update Details</button>
          <button className="action-button btn">Reset Password</button>
          <button className="action-button btn">Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default User;
