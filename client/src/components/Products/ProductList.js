import Product from './Product';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Card, Container } from 'react-bootstrap';
import './Product.css';

function ProductList() {
  const searchOptions = [
    {
      title: 'Product Code',
      type: 'text',
    },
    {
      title: 'Product Name',
      type: 'text',
    },
    {
      title: 'Product Category',
      type: 'text',
    },
  ];

  return (
    <div className="main-view">
      <ViewTitleBar title="Products List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="products" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="card">
              <Card.Title>New Product</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="product-list" className="list-container"></Container>
      </div>
    </div>
  );
}

export default ProductList;
