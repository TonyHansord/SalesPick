import SearchBar from '../Utilities/SearchBar';
import { Modal, Card, ListGroup, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import defaultImg from '../../defaultImg.png';

function AddProductModal({ show, handleClose, orderID, order }) {
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
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setSearchResults(data);
      });
  }, []);

  const renderProducts = () => {
    console.log(searchResults);
    return searchResults.map((product, index) => {
      return (
        <Container
          key={index}
          className="product-card"
          id={product.id}
          onClick={() => handleAddItem(product.id)}
        >
          <ListGroup>
            <ListGroup.Item>
              <Card.Title>{product.name}</Card.Title>
            </ListGroup.Item>
            <ListGroup.Item>
              <img
                src={
                  product.product_image ? product.product_image.url : defaultImg
                }
                alt={product.name}
              />
            </ListGroup.Item>
          </ListGroup>
          <ListGroup horizontal>
            <ListGroup.Item>
              <Card.Text>Code: {product.code}</Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Text className="price">${product.price}</Card.Text>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup horizontal>
            <ListGroup.Item>
              <Card.Text>
                Available: {product.current_stock - product.assigned_stock}
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
        </Container>
      );
    });
  };

  const handleAddItem = (id) => {
    console.log(id);

    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        product_id: id,
        quantity: 1,
        order_id: orderID,
        assigned_quantity: 0,
        picked_quantity: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        order.items.push(data);
        handleClose();
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
      <Modal.Body className="gallery">{renderProducts()}</Modal.Body>
    </Modal>
  );
}

export default AddProductModal;
