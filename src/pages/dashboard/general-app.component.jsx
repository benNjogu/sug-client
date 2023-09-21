import { useState, useEffect } from 'react';

import Navbar from '../../components/navbar/navbar.component';
import Category from '../../components/category';
import {
  user_categories,
  admin_categories,
  super_admin_categories,
} from '../../data/data';
import './general-app.styles.css';
import SelectedCategory from '../../components/dashboard/selected-category';

const GeneralApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    getComponent();
  };

  const handleLogoutClick = () => {
    setSelectedCategory(6);
  };

  const getComponent = () => {
    if (profileOpen) setSelectedCategory(0);
    else setSelectedCategory(1);
  };

  useEffect(() => {
    setSelectedCategory(1);
  }, []);

  return (
    <div className="size">
      {
        <Navbar
          handleProfileClick={handleProfileClick}
          handleLogoutClick={handleLogoutClick}
        />
      }
      <div className="row size">
        <div className="col-md-2 select_category">
          <Category
            categories={user_categories}
            onItemSelect={handleSelectedCategory}
            selectedItem={selectedCategory}
            badge={true}
          />
        </div>
        <div className="col select_category bg ">
          <SelectedCategory
            selectedCategory={selectedCategory}
            userType={'user'}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralApp;
