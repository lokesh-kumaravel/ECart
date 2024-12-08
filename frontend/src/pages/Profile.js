import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import commonContext from "../contexts/common/commonContext";

const Profile = () => {
  const { user } = useContext(commonContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    {
      console.log(user);
    }
    return <p>Loading...</p>;
  }

  return (
    <section id="profile_page" className="section">
      <div className="container">
        <h1>Welcome, {user.user.username}</h1>
        <p>Email: {user.user.email}</p>
      </div>
    </section>
  );
};

export default Profile;
