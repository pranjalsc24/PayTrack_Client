import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let islogin = useSelector((state) => state.auth.value);
  islogin = islogin || localStorage.getItem("ReconcilePro-token");
  let userName = localStorage.getItem("ReconcilePro-userName");
  let userAvatar = localStorage.getItem("ReconcilePro-userAvatar");

  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("ReconcilePro-token");
      localStorage.removeItem("ReconcilePro-userName");
      localStorage.removeItem("ReconcilePro-userAvatar");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Top Header Row */}
      <div className="hdr-header">
        <div className="hdr-header-left">
          <h1>PayTrack</h1>
        </div>
        <div className="hdr-header-right">
          {!islogin && (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hdr-header-link ${isActive ? "hdr-active-link" : ""}`
                }
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hdr-header-link ${isActive ? "hdr-active-link" : ""}`
                }
              >
                Login
              </NavLink>
            </>
          )}

          {islogin && (
            <>
              <div className="hdr-user-profile">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="hdr-user-avatar"
                />
                <span className="hdr-username">{userName}</span>
              </div>

              <button className="hdr-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Second Navigation Row */}
      <div className="hdr-sub-header">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
          }
        >
          Home
        </NavLink>

        {islogin && (
          <>
            <NavLink
              to="/invoice"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Invoice
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Transaction
            </NavLink>
            <NavLink
              to="/reconcile"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Reconcile
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Report
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
