const applyQueryModifiers = (query, action, column, value) => {
  if (value) {
    return query[action](column, value);
  }
  return query;
};

export default applyQueryModifiers;
