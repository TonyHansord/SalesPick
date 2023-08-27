import SearchBar from '../Utilities/SearchBar';
import { Modal, Form, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function AddProductModal({ show, handleClose, orderID }) {
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
        <Card key={product.id} id={product.id} onClick={handleAddItem}>
          <Card.Title>{product.name}</Card.Title>
          <img src={product.product_image.url} />
          <Card.Text>$ {product.price}</Card.Text>
          {/* <Card.Text>{product.code}</Card.Text> */}
        </Card>
      );
    });
  };

  const handleAddItem = (e) => {
    console.log(e.target.parentElement.id);

    const targetID = parseInt(e.target.parentElement.id);
    console.log(targetID);

    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        product_id: targetID,
        quantity: 1,
        order_id: orderID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
