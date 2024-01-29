import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Progress from '../../components/application/progress/progress.component';
import CourseDetails from '../../components/application/details-of-course';
import Overseas from '../../components/application/overseas-requirements';
import TrainingExpenses from '../../components/application/training-expenses';
import Declaration from '../../components/application/declaration';
import SelectNominees from '../../components/application/select-nominees/select-nominees.component';

import './new-application.styles.css';

const NewApplication = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  return (
    <div className="application_size">
      <Progress />
      <Routes>
        <Route
          path="/"
          element={<SelectNominees user={user} updateUser={updateUser} />}
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
