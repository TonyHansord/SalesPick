import * as Icon from 'react-bootstrap-icons';

function ViewTitleBar({ title, hasBackButton }) {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="title-bar">
      {hasBackButton && <Icon.ArrowLeft className='back-button' onClick={goBack}/>}
      <h2>{title}</h2>
    </div>
  );
}

export default ViewTitleBar;
