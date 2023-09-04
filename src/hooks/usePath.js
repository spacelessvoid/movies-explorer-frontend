import { useLocation } from "react-router-dom";

function usePath(path) {
  const location = useLocation();
  return location.pathname === path;
}

export default usePath;
