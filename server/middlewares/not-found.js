const notFound = (req, res) => {
  res.status(404);
  res.send("404 Route not found ");
};

module.exports = notFound;
