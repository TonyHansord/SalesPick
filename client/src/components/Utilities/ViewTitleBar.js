function ViewTitleBar({ title, hasBackButton }) {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="title-bar">
      {hasBackButton && (
        <button className="back-button btn" onClick={goBack}>
          Back
        </button>
      )}
      <h2>{title}</h2>
    </div>
  );
}

export default ViewTitleBar;
