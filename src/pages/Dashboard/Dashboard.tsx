import Layout from "../../components/Layout/Layout";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import { useUsers } from "../../hooks/useUsers";

const Dashboard: React.FC = () => {
const data = useUsers();
  return (
    <Layout>
      <DashboardComponent {...data} pageSize={10} />
    </Layout>
  );
};

export default Dashboard;
