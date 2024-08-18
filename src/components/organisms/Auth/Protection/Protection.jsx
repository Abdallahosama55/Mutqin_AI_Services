import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { 
  setUserImage, 
  setUserName, 
  setUserSubscriptionPlanEn, 
  setExperiedDatePlan, 
  setUserSubscriptionPriceEG, 
  setUserSubscriptionPriceUsd, 
  setCreatedDatePlan, 
  setUserWordsRemain, 
  setUserWordsSubscription, 
  setUserSubscriptionPlan 
} from "../../../../redux/slices/apiSlice";

const Protection = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Decode JWT and check expiration
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    
    const { exp } = JSON.parse(jsonPayload);
    
    if (!exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  };

  useEffect(() => {
    if (isTokenExpired(token)) {
      navigate("/signin");
      return;
    }

    const loginUse = async () => {
      try {
        const userActive = await axios.get(
          "https://backend.mutqinai.com/api/userinfo/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(userActive.data);
        setLoading(false);

        dispatch(setUserImage(userActive.data.profile_picture)); 
        dispatch(setUserName(userActive.data.username)); 
        dispatch(setUserWordsRemain(userActive.data.subscription_details.remaining_word_count)); 
        dispatch(setUserWordsSubscription(userActive.data.subscription_details.word_count)); 
        dispatch(setExperiedDatePlan(userActive.data.subscription_details.expired));
        dispatch(setCreatedDatePlan(userActive.data.subscription_details.created_at));  
        dispatch(setUserSubscriptionPlan(userActive.data.subscription_details.plan.ar));
        dispatch(setUserSubscriptionPlanEn(userActive.data.subscription_details.plan.en));
        dispatch(setUserSubscriptionPriceEG(userActive.data.subscription_details.price.egp));
        dispatch(setUserSubscriptionPriceUsd(userActive.data.subscription_details.price.usd));
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    
    loginUse();
  }, [dispatch, token]);

  useEffect(() => {
    if ((!token && !user.is_active) || (token && isTokenExpired(token))) {
      navigate("/signin");
    }
  }, [token, user.is_active, navigate]);

  if (loading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return token && user.is_active ? children : <div>Loading...</div>;
};

export default Protection;
