export default function MessageBar({
  message,
  showMessageBar,
  setShowMessageBar,
  messageType,
}) {
  const displayClass = messageType === 'error' ? 'error' : 'success';

  const barClass = showMessageBar ? '' : 'hidden';

  setTimeout(() => {
    setShowMessageBar(false);
  }, 3000);

  return (
    <div id="message-bar" className={`${displayClass} ${barClass}`}>
      <p>{message}</p>
    </div>
  );
}
