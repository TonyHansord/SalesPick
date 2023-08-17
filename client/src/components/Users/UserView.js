import ViewTitleBar from '../Utilities/ViewTitleBar';

function UserView({ user }) {
  return (
    <div className="main-view">
      <ViewTitleBar title={user.full_name} hasBackButton={true} />
      <div className="top-container">
        <div className="details-container">
          <div className="details">
            <p>
              <span className="bold-detail">Username: </span>
              {user.username}
            </p>
            <p>
              <span className="bold-detail">Name: </span>
              {user.full_name}
            </p>
            <p>
              <span className="bold-detail">Role: </span>
              {user.role}
            </p>
          </div>
        </div>
        <div className="action-container">
          <div className="user-action-container">
            <button className="action-button btn">Update Details</button>
            <button className="action-button btn">Reset Password</button>
            <button className="action-button btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
