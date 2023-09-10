function DetailsContainer({ data, image }) {
  const renderDetails = () => {
    return data.map((item) => {
      return (
        <p key={item.title}>
          <span className="item-heading">{item.title}: </span>
          {item.value}
        </p>
      );
    });
  };

  return (
    <div className="details-container">
      {image ? <img src={image} alt="product" /> : null}
      <div className="details">{renderDetails()}</div>
    </div>
  );
}

export default DetailsContainer;
