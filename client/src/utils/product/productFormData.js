import {
  patchProduct,
  postNewProduct,
} from '../../utils/product/productRequests';

export const validateForm = (form) => {
  const data = { errors: [], formData: {} };
  const formData = new FormData(form);
  formData.delete('photo');

  if (!formData.get('name'))
    data.errors.push('Заповніть будь ласка поле "Назва"');
  if (!formData.get('price'))
    data.errors.push('Заповніть будь ласка поле "Ціна".');
  if (!formData.get('typeId'))
    data.errors.push('Виберіть будь ласка категорію.');
  if (!formData.get('hostelId'))
    data.errors.push('Виберіть будь ласка гуртожиток.');

  if (data.errors.length > 0) return data;

  const formObject = Object.fromEntries(formData.entries());
  data.formData = formObject;
  return data;
};

export const handleNewProduct = async (form, token) => {
  const { errors, formData } = validateForm(form);

  if (errors.length > 0) return { errors, isSubmitted: false };

  const response = await postNewProduct({
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 'success') {
    return { errors: [], isSubmitted: true };
  } else {
    errors.push('Ми не змогли видалити Ваше оголошення.');
    return { errors, isSubmitted: false };
  }
};

export const handleEditProduct = async (form, id, token) => {
  const { errors, formData } = validateForm(form);

  if (errors.length > 0) return { errors, isSubmitted: false };

  const response = await patchProduct({
    id,
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 'success') {
    return { errors: [], isSubmitted: true };
  } else {
    errors.push('Ми не змогли видалити Ваше оголошення.');
    return { errors, isSubmitted: false };
  }
};
