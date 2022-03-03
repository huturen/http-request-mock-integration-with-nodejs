/**
 * @url https://jsonplaceholder.typicode.com/photos/1
 * @method get
 */
module.exports = function(requestInfo) {
  if (requestInfo.query.bypass === '1') {
    return this.bypass(); // do real network request
  }

  return {
    albumId: 123,
    id: 456,
    title: "this is a fake item.",
    mock: "yes"
  };
};
