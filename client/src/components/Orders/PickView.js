import { ViewTitleBar } from '../ViewTitleBar';

function PickView() {
  return (
    <div className="main-view">
      <ViewTitleBar title="Pick View" />
      <div className="main-container">
        <div className="top-container"></div>
        

        <div className="bottom-container">
          <div className="Items">
            <h3>Items</h3>
            <div className="items">
              <p>Item 1</p>
              <p>Item 2</p>
              <p>Item 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickView;
