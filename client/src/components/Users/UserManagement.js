import ViewTitleBar from '../Utilities/ViewTitleBar';
import SearchBar from '../Utilities/SearchBar';
import { Card, Container } from 'react-bootstrap';
import User from './User';
import { useEffect, useState } from 'react';
import UserModal from './UserModal';

function UserManagement({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [direction, setDirection] = useState('asc');

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

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <User key={user.id} user={user} setSelectedUser={setSelectedUser} />
      );
    });
  };

  const sortUsers = (type) => {
    let sortedUsers = [...users];

    if (direction === 'asc') {
      sortedUsers.sort((a, b) => {
        if (a[type] < b[type]) {
          return -1;
        } else if (a.type > b.type) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      sortedUsers.sort((a, b) => {
        if (a[type] > b[type]) {
          return -1;
        } else if (a.type < b.type) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    setDirection(direction === 'asc' ? 'desc' : 'asc');
    setUsers(sortedUsers);
    renderUsers();
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
        <Container id="users" className="list-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => sortUsers('username')}>Username</th>
                <th onClick={() => sortUsers('first_name')}>First Name</th>
                <th onClick={() => sortUsers('last_name')}>Last Name</th>
                <th onClick={() => sortUsers('role')}>Role</th>
              </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
          </table>
        </Container>
      </div>
      <UserModal
        show={showModal}
        handleClose={handleCloseModal}
        setUsers={setUsers}
      />
    </>
  );
}

export default UserManagement;
