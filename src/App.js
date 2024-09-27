import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Login from './page/login/Login';
import Register from './page/register/Register';
import { Layout } from './page/Layout';

import UserTable from './components/UserTable/UserTable';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <div className='App'>
      <Layout >
        <div className="Layout">
          <Routes>
            <Route path="/UserTable" element={<UserTable />} />
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
}

export default App;
