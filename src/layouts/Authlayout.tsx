import { Outlet, Navigate } from "react-router-dom";

function Authlayout() {
  const user = 0;

  if (user) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Authlayout;
