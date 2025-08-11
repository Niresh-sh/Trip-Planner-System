import { Outlet } from "react-router-dom";

function Auth() {
  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
