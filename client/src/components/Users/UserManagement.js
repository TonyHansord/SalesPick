import ViewTitleBar from '../Utilities/ViewTitleBar';
import SearchBar from '../Utilities/SearchBar';
import { Card, Container, ListGroup } from 'react-bootstrap';
import User from './User';
import { useEffect, useState } from 'react';
import { UserModal } from './UserModal';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

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

  const renderUsers = (role) => {
    return users
      .filter((user) => {
        return user.role === role;
      })
      .map((user) => {
        return (
          <User key={user.id} user={user} />
        );
      });
  };

  return (
    <>
      <ViewTitleBar title="User Management" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="Users" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="card med" onClick={handleShowModal}>
              <Card.Title>New User</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="users" className="bottom-container">
          <h3>Admin</h3>
          <ListGroup horizontal>{renderUsers('admin')}</ListGroup>
          <h3>Sales</h3>
          {renderUsers('sales')}
          <h3>Warehouse</h3>
          {renderUsers('warehouse')}
        </Container>
      </div>
      <UserModal
        show={showModal}
        handleClose={handleCloseModal}
        setUsers={setUsers}
        action={'new'}
      />
    </>
  );
}

export default UserManagement;
