import { useUserStore } from "@/store/userStore";
import { Outlet, Navigate } from "react-router-dom";

function Authlayout() {
  const token = useUserStore((state) => state.user);

  if (token || token !== null) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Authlayout;
