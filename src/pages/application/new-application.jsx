import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Nominee from '../../components/application/particulars-nominee.component';
import CourseDetails from '../../components/application/details-of-course';
import Overseas from '../../components/application/overseas-requirements';
import './new-application.css';

const NewApplication = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };
  console.log(user);

  const resetUser = () => {
    setUser({});
  };

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Nominee user={user} updateUser={updateUser} />}
        />
        <Route
          path="/course"
          element={<CourseDetails user={user} updateUser={updateUser} />}
        />
        <Route path="/overseas" element={<Overseas user={user} />} />
      </Routes>
    </div>
  );
};

export default NewApplication;
