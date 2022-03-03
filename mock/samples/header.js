/**
 * @url https://jsonplaceholder.typicode.com/header
 * @method get
 * @header application: application/json
 * @header abc: 123
 * @header xyz: aaa
 * @header xyz: bbb
 */
module.exports = () => {
  return  {
    ret: 0,
    msg: 'ok',
  };
}
