import Product from './Product';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import './Product.css';
import ProductModal from './ProductModal';

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

  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
      });
  }, []);

  const renderProducts = () => {
    return productList.map((product) => {
      return <Product key={product} product={product} />;
    });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="main-view">
      <ViewTitleBar title="Products List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="products" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="lrg" onClick={handleShowModal}>
              <Card.Title>New Product</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="product-list" className="list-container">
          {renderProducts()}
        </Container>
      </div>

      <ProductModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        setProductList={setProductList}
      />
    </div>
  );
}

export default ProductList;
