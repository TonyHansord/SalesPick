import { ListGroup } from 'react-bootstrap';
import { Container, Card } from 'react-bootstrap';

function DetailsContainer({ data, image }) {
  const renderDetails = () => {
    return data.map((item) => {
      return (
        <ListGroup.Item>
          <Card.Text className="bold-detail" key={item.title}>
            {item.title}:{' '}
          </Card.Text>
          <Card.Text key={item.value}>{item.value}</Card.Text>
        </ListGroup.Item>
      );
    });
  };

  return (
    <Container id="details-container" className='styled-card'>
      {image ? <img src={image} alt="product" /> : null}
      <ListGroup className="details">{renderDetails()}</ListGroup>
    </Container>
  );
}

export default DetailsContainer;
