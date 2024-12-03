import db from '../config/db.js';

export const getUserById = async (id) => {
  return db.from('user').select('*').eq('id', id);
};
export const updateUserById = async (
  id,
  {
    username,
    firstName,
    lastName,
    email,
    password,
    avatarImg,
    phoneNumber,
    hostel,
  },
) => {
  return db
    .from('user')
    .update({
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      avatar_img: avatarImg,
      phone_number: phoneNumber,
      hostel,
    })
    .eq('id', id);
};

export const deleteUserById = async (id) => {
  return db.from('user').delete().eq('id', id);
};
