export default (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};
