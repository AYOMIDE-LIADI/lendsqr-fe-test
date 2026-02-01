import Layout from "../../components/Layout/Layout";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import { useUsers } from "../../hooks/useUsers";


const Users: React.FC = () => {  
 const data = useUsers();
  return (
    <Layout>
      <DashboardComponent {...data} showUserDiv />
    </Layout>
  );
};

export default Users;
