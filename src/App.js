import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Analytics from './components/Analytics ';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Account from './components/Account';
import Protected from './components/Protected';
import Trainings from './components/Trainings';
import Cookies from "universal-cookie";

const App = () => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    if (token) {
      const myUser = cookies.get("USER");
      if (myUser) {
        setUser(myUser);
      }
    }

  }, [])
  return (
    <>
      <h1>Workout</h1>
      <Container>
        <Navigation />
        <Routes>
          {/* <Route index element={<Landing />} /> */}
          <Route path="/" element={<Account />} />
          <Route path="landing" element={<Landing />} />
          <Route path="/home" element={
            <Protected isLoggedIn={!!user}>
              <Home />
            </Protected>
          } />
          <Route path="/dashboard"
            element={
              <Protected isLoggedIn={!!user}>
                <Dashboard />
              </Protected>
            } />
          <Route path="/trainings" element={
            <Protected isLoggedIn={!!user && user.permissions.includes('register')}>
              <Trainings />
            </Protected>
          } />
          <Route
            path="/analytics"
            element={
              <Protected
                isLoggedIn={!!user && user.permissions.includes('analyze')}             >
                <Analytics />
              </Protected>
            }
          />
          <Route path="/admin" element={
            <Protected
              isLoggedIn={!!user && user.roles.includes('admin')}           >
              <Admin />
            </Protected>
          } />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;