import { useNavigate } from 'react-router-dom';

function User({ user, setSelectedUser }) {
  const navigate = useNavigate();

  const handleClickUser = () => {
    setSelectedUser(user);
    navigate(`/api/users/${user.id}`);
  };

  return (
    <tr onClick={handleClickUser}>
      <td>{user.username}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
      {/* <td>
       
      </td> */}
    </tr>
  );
}

export default User;
