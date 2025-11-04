const applyProductModifiers = (query, filter = {}, sort = {}, column = '') => {
  column += column && '.';

  const modifiers = [
    {
      action: 'ilike',
      column: column + 'name',
      value: filter.name && `%${filter.name}%`,
    },
    { action: 'gte', column: column + 'price', value: filter.price?.min },
    { action: 'lte', column: column + 'price', value: filter.price?.max },
    { action: 'eq', column: column + 'user_id', value: filter.userId },
    { action: 'in', column: column + 'type_id', value: filter.typeId },
    { action: 'in', column: column + 'hostel_id', value: filter.hostelId },
    {
      action: 'order',
      column: column + 'price',
      value: sort.price && { ascending: sort.price === 'asc' },
    },
    {
      action: 'order',
      column: column + 'created_at',
      value: sort.date && { ascending: sort.date === 'asc' },
    },
  ];

  for (const { action, column, value } of modifiers) {
    if (value) {
      query = query[action](column, value);
    }
  }

  return query;
};

export default applyProductModifiers;
