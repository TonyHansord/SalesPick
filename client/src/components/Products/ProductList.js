import Product from './Product';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useState } from 'react';
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

  let products = [
    {
      productCode: 'P001',
      productName: 'Product 1',
      productCategory: 'Category 1',
      productDescription: 'Description 1',
      productPrice: 100,
      productQuantity: 10,
      productAssigned: 0,
      productLength: 10,
      productWidth: 10,
      productHeight: 10,
      productWeight: 10,
      productImageURL: 'https://via.placeholder.com/150',
    },
  ];

  const [productList, setProductList] = useState(products);
  const [showModal, setShowModal] = useState(false);

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
            <Card className="card" onClick={handleShowModal}>
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
