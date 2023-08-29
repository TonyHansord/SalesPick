import { Card } from 'react-bootstrap';

function ActionContainer({ actions }) {
  return (
    <div className="action-container">
      {actions.map((action) => (
        <Card key={action.title} onClick={action.method}>
          <Card.Title>{action.title}</Card.Title>
        </Card>
      ))}
    </div>
  );
}

export default ActionContainer;
