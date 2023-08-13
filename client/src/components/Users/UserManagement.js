import ViewTitleBar from '../Utilities/ViewTitleBar';
import SearchBar from '../Utilities/SearchBar';
import { Card, Container } from 'react-bootstrap';
import User from './User';

function UserManagement() {
  const searchOptions = [
    {
      title: 'Username',
      type: 'text',
    },
    {
      title: 'First Name',
      type: 'text',
    },
    {
      title: 'Last Name',
      type: 'text',
    },
    {
      title: 'Role',
      type: 'text',
    },
  ];

  return (
    <div className="main-view">
      <ViewTitleBar title="User Management" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="Users" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="card">
              <Card.Title>New User</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="users" className="list-container">
          <table>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
            <User />
            <User />
            <User />
          </table>
        </Container>
      </div>
    </div>
  );
}

export default UserManagement;
