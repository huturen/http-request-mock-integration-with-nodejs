/**
 * @url https://jsonplaceholder.typicode.com/delay
 * @method get
 * @header content-type: application/json
 * @status 200
 * @delay 800
 * @disable no
 */
module.exports = () => {
  return {
    msg: "some mock data",
    time: new Date().toLocaleString()
  };
};
