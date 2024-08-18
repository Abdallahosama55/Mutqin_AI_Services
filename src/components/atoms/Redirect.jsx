import { Navigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function Redirect({ to, isId, isNew }) {
  const location = useLocation();
  return (
    <Navigate
      // to={`${to}/${isId ? crypto.randomUUID() : ""}${isNew ? "?new=true" : ""}`}
      to={`${to}/${isId ? uuidv4() : ""}${isNew ? "?new=true" : ""}`}
      replace
      state={location.state}
    />
  );
}
