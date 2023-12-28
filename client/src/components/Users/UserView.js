import { useState, useContext } from 'react';
import ActionContainer from '../Utilities/ActionContainer';
import DetailsContainer from '../Utilities/DetailsContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageContext } from '../../App';
import { UserModal, PasswordModal } from './UserModal';
import { useFetch } from '../../hooks/useFetch';

function UserView() {
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { displayMessage } = useContext(MessageContext); // Display global messages

  const { data: user, loading } = useFetch(`/api/users/${params.id}`);

  const userDetails = [
    {
      title: 'Full Name',
      value: user.full_name,
    },
    {
      title: 'Username',
      value: user.username,
    },
    {
      title: 'Role',
      value: user.role.charAt(0).toUpperCase() + user.role.slice(1),
    },
  ];

  const actions = [
    // List of actions to be displayed in the ActionContainer

    {
      title: 'Edit User',
      method: () => {
        console.log('Edit User');
        handleShowModal();
      },
    },
    {
      title: 'Reset Password',
      method: () => {
        console.log('Reset Password');
        handleShowPasswordModal();
      },
    },
    {
      title: 'Delete User',
      method: () => {
        fetch(`/api/users/${params.id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            displayMessage(data.message, 'success');
            navigate('/users');
          });
      },
    },
  ];

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowPasswordModal = () => setShowPasswordModal(true);

  if (!loading) {
    return (
      <>
        <ViewTitleBar title={user.full_name} hasBackButton={true} />
        <div className="top-container">
          <DetailsContainer data={userDetails} />
          <ActionContainer actions={actions} cardSize={'med'} />
        </div>
        <UserModal
          show={showModal}
          handleClose={handleCloseModal}
          data={user}
          action={'edit'}
        />
        <PasswordModal
          show={showPasswordModal}
          handleClose={handleClosePasswordModal}
          user={params.id}
        />
      </>
    );
  } else {
    return (
      <>
        <ViewTitleBar title={'Loading...'} hasBackButton={true} />
      </>
    );
  }
}

export default UserView;
