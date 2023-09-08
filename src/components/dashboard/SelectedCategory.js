import Users from './Users';
import Admins from './Admins';
import Applications from './Applications';
import Escalated from './Escalated';
import Pending from './Pending';
import Rejected from './Rejected';
import Nominees from './Nominees';
import Profile from './Profile';
import Approved from './Approved';

const SelectedCategory = ({ selectedCategory, userType }) => {
  console.log(userType);
  if (userType === 'user') {
    switch (selectedCategory) {
      case 0:
        return <Profile />;
      case 1:
        return <Applications />;
      case 2:
        return <Approved />;
      case 3:
        return <Pending />;
      case 4:
        return <Rejected />;
      case 5:
        return <Nominees />;
      case 6:
        return 'Logout dialog';
      default:
        break;
    }
  }
  if (userType === 'admin') {
    switch (selectedCategory) {
      case 0:
        return <Profile />;
      case 1:
        return <Applications />;
      case 2:
        return <Pending />;
      case 3:
        return <Approved />;
      case 4:
        return <Rejected />;
      case 5:
        return <Escalated />;
        return 'Logout dialog';
      default:
        break;
    }
  }
  if (userType === 'super_admin') {
    switch (selectedCategory) {
      case 0:
        return <Profile />;
      case 1:
        return <Users />;
      case 2:
        return <Admins />;
      case 3:
        return <Applications />;
      case 4:
        return <Approved />;
      case 5:
        return <Pending />;
      case 6:
        return <Rejected />;
      case 7:
        return <Escalated />;
      case 8:
        return <Nominees />;
      case 9:
        return 'Logout dialog';
      default:
        break;
    }
  }
};

export default SelectedCategory;
