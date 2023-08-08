import Customer from './Customer';

function CustomerList() {
  return (
    <div className="main-view">
      <h1>Customers</h1>
      <Customer name="Bob" />
    </div>
  );
}

export default CustomerList;
