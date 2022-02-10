module.exports = function (_query) {
    const query = _query;
    let queryStr = JSON.stringify({ ...query });
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne|in)\b/g, (match) => `$${match}`);
    return JSON.parse(queryStr);
  };