import { useEffect, useState, useContext } from 'react';
import ActionContainer from '../Utilities/ActionContainer';
import DetailsContainer from '../Utilities/DetailsContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageContext } from '../../App';
import { UserModal, PasswordModal } from './UserModal';

function UserView() {
  const [user, setUser] = useState({
    full_name: '',
    username: '',
    role: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { displayMessage } = useContext(MessageContext);

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [params]);

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
      value: user.role,
    },
  ];

  const actions = [
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
}

export default UserView;
