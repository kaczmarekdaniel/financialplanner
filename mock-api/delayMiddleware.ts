module.exports = (req, res, next) => {
    const delay = 1000; // Delay in milliseconds, e.g., 1000ms = 1 second
    setTimeout(next, delay);
  };