import { Navigate} from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
return children ;
//return children ? children : <Outlet />;
};
export default Protected;