import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import DefaultLayout from '../../components/default-layout/default-layout.component';
import SearchBox from '../../components/search-box';
import { DispatchNominee, fetchAllNominees } from '../../redux/slices/admin';
import UsersCard from '../../components/users-card/users-card.component';
import Spinner from '../../components/spinner';

const AllNominees = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [inactiveBtn, setInactiveBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  let { nominees } = useSelector((state) => state.admin);
  console.log(nominees);

  const [modal, contextHolder] = Modal.useModal();
  const handleDisable = (id) => {
    modal.confirm({
      title: 'Disable',
      icon: <QuestionCircleOutlined />,
      content: 'Disable this nominee?',
      okText: 'DISABLE',
      cancelText: 'CANCEL',
      onOk: () => disableNominee(id),
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Searching from firstName, lastName, both lastName and lastName and national id number.
  if (searchQuery) {
    nominees = nominees.filter(
      (n) =>
        n.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        n.last_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        // combinines firstName and lastName
        (n.first_name + ' ' + n.last_name)
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase()) ||
        // converts idNumber to a string first
        n.idNumber
          .toString()
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
    );
  }

  const handleView = (id) => {
    console.log('nv_id', id);
  };

  const disableNominee = (id) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(DispatchNominee(id));
      setLoading(false);
      setInactiveBtn(true);
    }, 500);
  };

  useEffect(() => {
    dispatch(fetchAllNominees());
  }, []);

  return (
    <DefaultLayout>
      {contextHolder}
      <Spinner loading={loading} />
      <SearchBox
        placeholder={'Search nominee by id or name...'}
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="row overflow-auto">
        {nominees.length > 0
          ? nominees.map((n) => (
              <div key={n.id} className="col-md-4 mb-3">
                <UsersCard
                  btn1Text={'View'}
                  btn2Text={n.active ? 'Disable' : 'Disabled'}
                  btn1Click={handleView}
                  btn2Click={handleDisable}
                  deactivateBtn={inactiveBtn}
                  user={n}
                />
              </div>
            ))
          : ''}
      </div>
    </DefaultLayout>
  );
};

export default AllNominees;
