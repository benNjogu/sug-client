import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import SearchBox from '../../components/search-box';
import { fetchAllNominees } from '../../redux/slices/admin';
import NomineeCard from '../../components/nominee-card/nominee-card.component';
import UsersCard from '../../components/users-card/users-card.component';

const AllNominees = () => {
  const dispatch = useDispatch();
  const { nominees } = useSelector((state) => state.admin);
  console.log(nominees);

  useEffect(() => {
    dispatch(fetchAllNominees());
  }, []);

  return (
    <DefaultLayout>
      <SearchBox placeholder={'Search nominee by id or name...'} />
      <div className="row overflow-auto">
        {nominees.length > 0
          ? nominees.map((n) => (
              <div key={n.id} className="col-md-4 mb-3">
                <UsersCard
                  btn1Text={'View'}
                  btn2Text={'Disable'}
                  onEdit={'handleEdit'}
                  nominee={n}
                />
              </div>
            ))
          : ''}
      </div>
    </DefaultLayout>
  );
};

export default AllNominees;
