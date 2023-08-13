import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomeView.css';

function HomeView({ sections }) {
  const mainSections = sections.filter((section) => section.title !== 'Home');

  const renderCards = () => {
    return mainSections.map((section) => {
      return (
        <Link key={section.title} to={section.url} className="card">
          <Card.Title>{section.title}</Card.Title>
        </Link>
      );
    });
  };

  return (
    <div id="home-view" className="home-view">
      {renderCards()}
    </div>
  );
}

export default HomeView;
