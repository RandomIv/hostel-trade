import { useState } from 'react';
import classes from './ProfileSettings.module.css';
import emptyPhoto from './../../assets/no-avatar-image.png';
import DynamicInput from '../../components/DynamicInput/DynamicInput.jsx';
import DropDownInput from '../../components/DropDownInput/DropDownInput.jsx';
import { Form, useNavigate, useRouteLoaderData } from 'react-router-dom';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar.jsx';
import { updateUserProfile } from '../../utils/profile.js';
import UploadImage from '../../components/UploadImage/UploadImage.jsx';

export default function ProfileSettingsPage() {
  const { userData: user, sortedHostels: hostels } =
    useRouteLoaderData('profile-root');
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();
  console.log(userData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('called: ', reader);
        setUserData((prevUser) => ({
          ...prevUser,
          avatar_img: reader.result,
        }));
      };
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(userData, hostels);
      navigate('/profile');
      navigate(0);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className={classes['profile-page']}>
      <ProfileNavBar />
      <div className={classes['profile-container']}>
        <Form
          method="post"
          onSubmit={handleSave}
          className={classes['profile-settings-form']}
        >
          <div className={classes['profile-main']}>
            <div className={classes['profile-image-container']}>
              <img
                src={userData.avatar_img || emptyPhoto}
                alt="Your avatar"
                className={classes['profile-image']}
              />
              <UploadImage handleFileChange={handleFileChange}></UploadImage>
            </div>
            <ul className={classes['profile-main-description']}>
              <li>
                <DynamicInput
                  name={'username'}
                  label={userData.username}
                  handleInputChange={handleInputChange}
                >
                  <h2>{userData.username}</h2>
                </DynamicInput>
              </li>
              <li>
                <b>Пошта:</b>
                <DynamicInput
                  name={'email'}
                  label={userData.email}
                  handleInputChange={handleInputChange}
                >
                  <p>{userData.email}</p>
                </DynamicInput>
              </li>
              <li>
                <b>Телефон:</b>
                <DynamicInput
                  name={'phone_number'}
                  label={userData.phone_number}
                  handleInputChange={handleInputChange}
                >
                  <p>{userData.phone_number}</p>
                </DynamicInput>
              </li>
            </ul>
            <div className={classes['profile-main-date']}>
              <p>З нами з: {user.created_at.split('T')[0]}</p>
            </div>
          </div>
          <div className={classes['profile-details']}>
            <ul>
              <li>
                <h2>Особиста інформація</h2>
              </li>
              <li>
                <b>Ім'я:</b>
                <DynamicInput
                  name={'first_name'}
                  label={userData.first_name}
                  handleInputChange={handleInputChange}
                >
                  <p>{userData.first_name}</p>
                </DynamicInput>
              </li>
              <li>
                <b>Прізвище:</b>
                <DynamicInput
                  name={'last_name'}
                  label={userData.last_name}
                  handleInputChange={handleInputChange}
                >
                  <p>{userData.last_name}</p>
                </DynamicInput>
              </li>
              <li>
                <b>Гуртожиток:</b>
                <DropDownInput
                  name={'hostel'}
                  label={userData.hostel}
                  data={hostels}
                  handleInputChange={handleInputChange}
                ></DropDownInput>
              </li>
            </ul>
          </div>
          <div className={classes['profile-manipulation']}>
            <button>Зберегти зміни</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
