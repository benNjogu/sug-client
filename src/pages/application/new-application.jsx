import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Nominee from '../../components/application/particulars-nominee.component';
import CourseDetails from '../../components/application/details-of-course';
import Overseas from '../../components/application/overseas-requirements';
import './new-application.css';

const NewApplication = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Nominee />} />
        <Route path="/course" element={<CourseDetails />} />
        <Route path="/overseas" element={<Overseas />} />
      </Routes>
    </div>
  );
};

export default NewApplication;
