import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomeView.css';

function HomeView({ sections }) {
  const mainSections = sections.filter((section) => section.title !== 'Home');

  const renderCards = () => {
    return mainSections.map((section) => {
      return (
        <Link to={section.url} className="card">
          <Card.Title>{section.title}</Card.Title>
        </Link>
      );
    });
  };

  return (
    <div id="home-view" className="main-view">
      {renderCards()}
    </div>
  );
}

export default HomeView;
