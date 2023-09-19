import { Container, ListGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function User({ user, setSelectedUser }) {
  const navigate = useNavigate();

  const handleClickUser = () => {
    setSelectedUser(user);
    navigate(`/users/${user.id}`);
  };

  return (
    <Card className="card med" onClick={handleClickUser}>
      <Card.Title>{user.full_name}</Card.Title>
    </Card>
  );
}

export default User;
