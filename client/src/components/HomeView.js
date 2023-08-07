import { Card } from 'react-bootstrap';
import './HomeView.css';

function HomeView() {
  const sections = [
    {
      title: 'Customers',
      url: '/customers',
    },
    {
      title: 'Orders',
      url: '/orders',
    },
    {
      title: 'Products',
      url: '/products',
    },
    {
      title: 'User Management',
      url: '/users',
    },
  ];

  const renderCards = () => {
    return sections.map((section) => {
      return (
        <div className="card">
          <Card.Title>{section.title}</Card.Title>
        </div>
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
