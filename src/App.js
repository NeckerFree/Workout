import React from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Route, Routes } from 'react-router-dom';
// import Account from './components/Account';
// import AuthComponent from './components/AuthComponent';
// import FreeComponent from './components/FreeComponent';
// import Login from './components/Login';
// import Navigation from './components/Navigation';
// // import ProtectedRoutes from './components/ProtectedRoutes';
// import Register from './components/Register';

// const App = () => {
//   return (
//     <>
//       <Container>
//         <Row>
//           <Col>
//             <h1>Side Project</h1>
//             <Navigation />
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} sm={12} md={6} lg={6}><Register /></Col>
//           <Col xs={12} sm={12} md={6} lg={6}><Login /></Col>
//         </Row>
//         <Routes>
//           <Route exact path="/" element={Account} />
//           <Route exact path="/free" element={FreeComponent} />
//           <Route exact path="/auth" element={AuthComponent} />
//           <Route path="*" element={<p>There's nothing here: 404!</p>} />
//         </Routes>
//         {/* <ProtectedRoutes element={AuthComponent} /> */}
//       </Container>
//     </>
//   )
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Analytics from './components/Analytics ';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoutes';

const App = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = () =>
    setUser({
      id: '1',
      name: 'robin',
      permissions: ['analyze'],
      roles: ['admin'],
    });
  const handleLogout = () => setUser(null);

  return (
    <>
      <h1>Workout</h1>

      <Navigation />
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="analytics"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={
                !!user && user.permissions.includes('analyze')
              }
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="admin" element={
          <ProtectedRoute
            redirectPath="/home"
            isAllowed={!!user && user.roles.includes('admin')}
          >
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default App;