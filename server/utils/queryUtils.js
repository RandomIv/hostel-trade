const applyQueryModifiers = (query, action, column, value) => {
  if (value && value !== '%null%') {
    return query[action](column, value);
  }
  return query;
};

export default applyQueryModifiers;
