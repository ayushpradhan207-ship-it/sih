const requestHandler = require('../server');

module.exports = async (req, res) => {
  return requestHandler(req, res);
};
