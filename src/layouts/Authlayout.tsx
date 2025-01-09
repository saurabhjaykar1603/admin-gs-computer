import { Outlet, Navigate } from "react-router-dom";

function Authlayout() {
  const user = 0;

  if (user) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <div>
        <h1>header</h1>
      <Outlet />
    </div>
  );
}

export default Authlayout;
