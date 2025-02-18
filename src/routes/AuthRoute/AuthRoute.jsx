import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SigninPage from '../../pages/SigninPage/SigninPage';
import SignupPage from '../../pages/SignupPage/SignupPage';

function AuthRoute(props) {


    return (
        <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    );
}

export default AuthRoute;