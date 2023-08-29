function DetailsContainer({ data }) {
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
      <div className="details"></div>
      {renderDetails()}
    </div>
  );
}

export default DetailsContainer;
