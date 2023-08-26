import SearchBar from '../Utilities/SearchBar';
import { Modal, Form, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function AddProductModal({ show, handleClose }) {
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

  const searchOptions = [
    {
      title: 'Product Code',
      key: 'code',
      type: 'text',
    },
    {
      title: 'Product Name',
      key: 'name',
      type: 'text',
    },
    {
      title: 'Product Category',
      key: 'category',
      type: 'text',
    },
  ];

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const renderProducts = () => {
    console.log(searchResults);
    return searchResults.map((product) => {
      return (
        <Card key={product.id}>
          <Card.Title>{product.name}</Card.Title>
          <img src={product.product_image.url} />
          <Card.Text>$ {product.price}</Card.Text>
          {/* <Card.Text>{product.code}</Card.Text> */}
        </Card>
      );
    });
  };

  return (
    <Modal show={show} onHide={handleClose} className="addProduct">
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <SearchBar
        id="productSearch"
        hasNoTitle={true}
        type="products"
        data={products}
        searchOptions={searchOptions}
        setSearchResults={setSearchResults}
      />
      <Modal.Body>{renderProducts()}</Modal.Body>
    </Modal>
  );
}

export default AddProductModal;
