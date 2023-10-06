import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function User({ user }) {
  const navigate = useNavigate();

  const handleClickUser = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Card className="card med styled-card" onClick={handleClickUser}>
      <Card.Title>{user.full_name}</Card.Title>
    </Card>
  );
}

export default User;
