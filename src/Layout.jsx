import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/molecules/Header";
import Toaster from "./components/atoms/Toaster";
import HistoryPanel from "./elements/HistoryPanel";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <Stack
      dir="rtl"
      style={{
        minHeight: "100vh",
      }}
    >
      {!pathname.includes("myaccount") && <Header />}

      <Stack className="position-relative p-0 m-0">
        <Toaster />
        <Outlet />
        <HistoryPanel />
      </Stack>
    </Stack>
  );
};

export default Layout;
