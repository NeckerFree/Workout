import React from 'react';
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav id="navigation">
    <Link to="/account">Account</Link>
    <Link to="/landing">Landing</Link>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/trainings">Register Training</Link>
    <Link to="/analytics">Analytics</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);
export default Navigation;
