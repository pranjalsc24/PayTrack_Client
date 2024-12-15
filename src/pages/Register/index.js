import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import "./style.css";
import { register } from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Name, email, and password are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await register(formData);

      if (res.data?.success) {
        localStorage.setItem("ReconcilePro-token", res.data?.token);
        localStorage.setItem("ReconcilePro-userName", res.data?.userName);
        localStorage.setItem("ReconcilePro-userAvatar", res.data?.userAvatar);
        dispatch(login());
        toast.success("Registration successful");

        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data.message);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null); // Clear state
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  return (
    <div className="reg-register">
      <div className="reg-header">
        <h2>Register</h2>
      </div>
      <form onSubmit={handleFormSubmit} className="reg-form">
        {/* Name Input */}
        <div className="reg-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="reg-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="reg-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Avatar Input (Optional) */}
        <div className="reg-form-group">
          <label htmlFor="avatar">Upload Avatar (Optional)</label>
          <input
            type="file"
            id="avatar"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="reg-avatar-input"
          />
        </div>

        <button type="submit" className="reg-submit-btn">
          Register
        </button>
      </form>
      <div className="reg-footer">
        <p>
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="reg-register-link"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
