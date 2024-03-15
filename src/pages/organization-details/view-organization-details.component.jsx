import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Tabs, message } from "antd";

import Navbar from "../../components/navbar/navbar.component";
import "./view-organization-details.styles.css";
import Spinner from "../../components/spinner";

const { TabPane } = Tabs;

const ViewOrganizationDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state.record;
  console.log("vo", record);

  const [loading, setLoading] = useState(false);

  const handleBackpressed = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate(-1);
    }, 300);
  };

  return (
    <>
      <Navbar title={record.user_name} handleBackpressed={handleBackpressed} />
      <div className="main-div">
        <Spinner loading={loading} />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key={1}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="Applications" key={2}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="Approved" key={3}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="Deffered" key={4}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="Rejected" key={5}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="Nominees" key={6}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="Deleted Nominees" key={7}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
          <TabPane tab="HR Managers" key={8}>
            <Table dataSource={[]} columns={[]} className="mt-2" />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ViewOrganizationDetails;
