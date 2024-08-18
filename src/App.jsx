import "./App.css";
import SignUp from "./components/organisms/Auth/SignUp/SignUp";
import SignIn from "./components/organisms/Auth/SignIn/SignIn";
import AppLayoutmot from "@/Util/dashboardLayout/AppLayoutmot";
import ForgotPassword from "./components/organisms/Auth/ForgotPassword/ForgotPassword";
import VerifyAccount from "./components/organisms/Auth/VerifyAccount/VerifyAccount";
import NewPassword from "./components/organisms/Auth/NewPassword/NewPassword";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import CreateArticle from "./pages/Create-article";
import { Toaster } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Protection from "./components/organisms/Auth/Protection/Protection";
import MyPlan from "./pages/MyPlan/MyPlan";
import CreateImage from "./pages/Create-Image/CreateImage";

import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import CheckAndRedirect from "./helpers/CheckAndRedirect";
import EditorPage from "./pages/editor";
import { useEffect, useState } from "react";
import { actionsTypes } from "./helpers/constants";
import { getCurrentUser } from "@/redux/features/api/userSlice";
import { Spinner } from "react-bootstrap";
import Control from "./pages/ControlPanal/Control";
import Reformulate from "./pages/Reformulate/Reformulate";
import Add_Ads from "./pages/Add-Ads";
import ChatLayout from "./pages/chat/ChatLayout";
import Welcome from "./pages/chat/welcome";
import NormalChat from "./pages/chat/normal-chat";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import EndTrial from "./components/molecules/EndTrial";
import ContentSection from "@/pages/ContentSections";
import ContentSectionChat from "@/pages/ContentSections/chat";
import Redirect from "./components/atoms/Redirect";
import Policy from "./pages/policy/Policy";
import MyAccount from "./pages/MyAccount/Myaccount";
import HumanPhilanthropist from "./pages/HumanPhilanthropist/HumanPhilanthropist";
function App() {
  const token = localStorage.getItem("token");
  const [showChat, setShowChat] = useState(0);
  const queryClient = new QueryClient();
// tokenUtils.js
const isTokenValid = (token) => {
  if (!token) return false;

  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expiry = tokenPayload.exp;

  return expiry * 1000 > Date.now();
};


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <WrapperComponent>
            <Routes>
              <Route>
                <Route path="/policy" element={<Policy />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verifyaccount" element={<VerifyAccount />} />
                <Route path="/newpassword" element={<NewPassword />} />
                <Route path="/newpassword/:id" element={<NewPassword />} />

                <Route
                  element={
                    !token || !isTokenValid(token) ? (
                      <SignIn />
                    ) : (
                      <Protection>
                        <AppLayoutmot />
                      </Protection>
                    )
                  }
                >
                  <Route path="/control" element={<Control />} />
                  <Route path="/content-section" element={<ContentSection />} />

                  <Route path="/add-ads/:slug" element={<Add_Ads />} />
                  {/* <Route path="/reformulate" element={<Reformulate />} /> */}
                  <Route path="/reformulate">
                    <Route
                      index
                      element={<Redirect to={"."} isId={true} isNew={true} />}
                    />
                    <Route path=":id" element={<Reformulate />} />
                  </Route>
                  <Route path="/create-article">
                    <Route
                      index
                      element={<Redirect to={"."} isId={true} isNew={true} />}
                    />
                    <Route path=":id" element={<CreateArticle />} />
                  </Route>

                  <Route path="/human-philanthropist" element={<HumanPhilanthropist/>} />
                  <Route path="/content-section" element={<ContentSection />} />
                  <Route
                    path="/content-section/:template_id/:document_id"
                    element={<ContentSectionChat />}
                  />
                  <Route
                    path="/content-section/:template_id/:document_id/:request_id"
                    element={<ContentSectionChat isNew={false} />}
                  />
                  <Route path="/create-image" element={<CreateImage />} />
                  <Route path="/editor">
                    <Route
                      index
                      element={<Redirect to={"."} isId={true} isNew={true} />}
                    />
                    <Route path=":id" element={<EditorPage />} />
                  </Route>

                  <Route
                    path="*"
                    element={<Navigate replace to="/control" />}
                  />
                </Route>
                <Route
                  element={
                    !token || !isTokenValid(token) ? (
                      <SignIn />
                    ) : (
                      <Protection>
                        <Layout />
                      </Protection>
                    )
                  }
                >
                  <Route path="/detector/:id" element={<Home />} />
                  <Route path="/detector" element={<Home />} />
                </Route>

                <Route
                  element={
                    !token || !isTokenValid(token) ? (
                      <SignIn />
                    ) : (
                      <Protection>
                        <Layout />
                      </Protection>
                    )
                  }
                ></Route>
                <Route path="/myaccount" element={<MyAccount />} />

                <Route path="/myplan" element={<MyPlan />} />
              </Route>

              <Route path={"/chat"} element={<ChatLayout />}>
                <Route index element={<Welcome />} />
                <Route path={":chatId"} element={<NormalChat />} />
              </Route>
            </Routes>
          </WrapperComponent>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;

const WrapperComponent = ({ children }) => {
  const pathname = useLocation();

  const dispatch = useAppDispatch();
  const closePanel = () => {
    dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL_FALSE });
  };

  const user = useAppSelector((state) => state.user);
  const checker = useAppSelector((state) => state.checker);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    !user.username && dispatch(getCurrentUser());
    closePanel();
    setLoading(false);
  }, [pathname]);
  const [endTrial, setEndTrial] = useState(false);

  useEffect(() => {
    if (
      checker.text.split(" ").length - 1 > 2500 &&
      user.subscription_plan === "Free"
    ) {
      setEndTrial(true);
    }
  }, [checker.text]);
  if (loading) return <Spinner />;

  return (
    <>
      <EndTrial onClose={() => setEndTrial(false)} show={endTrial} />
      {children}
    </>
  );
};
