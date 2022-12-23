 import React from 'react';
 import { Link } from "react-router-dom";

// const Navigation = () => (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/home">Home</Link>
//       <Link to="/free">Free Component</Link>
//       <Link to="/analytics">Analytics</Link>
//       <Link to="/auth">Auth Component</Link>
//     </nav>
//   );

const Navigation = () => (
  <nav>
    <Link to="/landing">Landing</Link>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/analytics">Analytics</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);
export default Navigation;