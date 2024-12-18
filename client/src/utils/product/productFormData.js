import { postNewProduct } from '../../utils/product/productRequests';

export const handleNewProduct = async (form, token) => {
  const data = { errors: [], isSubmitted: false };

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

  const response = await postNewProduct({
    body: JSON.stringify(formObject),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 'success') {
    data.isSubmitted = true;
    return data;
  } else {
    data.errors.push('Ми не змогли видалити Ваше оголошення.');
    return data;
  }
};
