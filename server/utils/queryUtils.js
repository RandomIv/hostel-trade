const applyProductModifiers = (query, filter = {}, sort = {}) => {
  query = applyFilters(query, filter);
  query = applySorting(query, sort);

  return query;
};

const applyFilters = (query, filter) => {
  const filterModifiers = [
    {
      action: 'ilike',
      column: 'name',
      value: filter.name && `%${filter.name}%`,
    },
    { action: 'gte', column: 'price', value: filter.price?.min },
    { action: 'lte', column: 'price', value: filter.price?.max },
    { action: 'eq', column: 'user_id', value: filter.userId },
    { action: 'in', column: 'type_id', value: filter.typeId },
    { action: 'in', column: 'hostel.id', value: filter.hostelId },
  ];

  for (const { action, column, value } of filterModifiers) {
    if (value) {
      query = query[action](column, value);
    }
  }

  return query;
};

const applySorting = (query, sort) => {
  const sortModifiers = [
    {
      action: 'order',
      column: 'price',
      value: sort.price && { ascending: sort.price === 'asc' },
    },
    {
      action: 'order',
      column: 'created_at',
      value: sort.date && { ascending: sort.date === 'asc' },
    },
  ];

  for (const { action, column, value } of sortModifiers) {
    if (value) {
      query = query[action](column, value);
    }
  }

  return query;
};

export default applyProductModifiers;
