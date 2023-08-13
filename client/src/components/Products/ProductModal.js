import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

function ProductModal({ show, handleCloseModal, setProductList }) {
  const [product, setProduct] = useState({
    productCode: '',
    productName: '',
    productCategory: '',
    productPrice: '',
    productLength: 0,
    productWidth: 0,
    productHeight: 0,
    productWeight: 0,
    productQuantity: 0,
    productAssigned: 0,
    productImageURL: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(product);
    setProductList((productList) => [...productList, product]);
    handleCloseModal();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="new-product-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="productCode">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product code"
              value={product.productCode}
              onChange={(e) =>
                setProduct({ ...product, productCode: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="productName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={product.productCategory}
              onChange={(e) =>
                setProduct({ ...product, productCategory: e.target.value })
              }
              placeholder="Enter product category"
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="currency"
              value={product.productPrice}
              onChange={(e) =>
                setProduct({ ...product, productPrice: e.target.value })
              }
              placeholder="Enter product price"
            />
          </Form.Group>
          <Form.Group
            className="form-group dimensions"
            controlId="productDimensions"
          >
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="number"
              value={product.productLength}
              onChange={(e) =>
                setProduct({ ...product, productLength: e.target.value })
              }
              placeholder="Length"
            />
            <Form.Control
              type="number"
              value={product.productWidth}
              onChange={(e) =>
                setProduct({ ...product, productWidth: e.target.value })
              }
              placeholder="Width"
            />
            <Form.Control
              type="number"
              value={product.productHeight}
              onChange={(e) =>
                setProduct({ ...product, productHeight: e.target.value })
              }
              placeholder="Height"
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="productWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              value={product.productWeight}
              onChange={(e) =>
                setProduct({ ...product, productWeight: e.target.value })
              }
              placeholder="Weight"
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="productQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={product.productQuantity}
              onChange={(e) =>
                setProduct({ ...product, productQuantity: e.target.value })
              }
              placeholder="Quantity"
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="productImageURL">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={product.productImageURL}
              onChange={(e) =>
                setProduct({ ...product, productImageURL: e.target.value })
              }
              placeholder="Image URL"
            />
          </Form.Group>

          <button className="btn" type="submit">
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
