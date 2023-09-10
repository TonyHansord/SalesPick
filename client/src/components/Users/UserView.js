import DetailsContainer from '../Utilities/DetailsContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';

function UserView({ user }) {

  const userDetails = [
    {
      title: 'Username',
      value: user.username,
    },
    {
      title: 'Full Name',
      value: user.full_name,
    },
    {
      title: 'Role',
      value: user.role,
    },
  ];

  return (
    <div className="main-view">
      <ViewTitleBar title={user.full_name} hasBackButton={true} />
      <div className="top-container">
        <DetailsContainer data={userDetails} />
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
