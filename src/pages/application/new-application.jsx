import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Nominee from '../../components/application/particulars-nominee.component';
import CourseDetails from '../../components/application/details-of-course';
import Overseas from '../../components/application/overseas-requirements';
import './new-application.css';
import TrainingExpenses from '../../components/application/training-expenses';
import Declaration from '../../components/application/declaration';

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
        <Route
          path="/overseas"
          element={<Overseas user={user} updateUser={updateUser} />}
        />
        <Route
          path="/training-expenses"
          element={<TrainingExpenses user={user} updateUser={updateUser} />}
        />
        <Route
          path="/declaration"
          element={<Declaration user={user} updateUser={updateUser} />}
        />
      </Routes>
    </div>
  );
};

export default NewApplication;
