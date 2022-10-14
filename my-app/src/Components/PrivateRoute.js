import {Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({isAuth}) =>{

    let navigate = useNavigate();
    let auth = {'token':isAuth}
    return (
        auth.token ? <Outlet/> : navigate("/login")
    )
}

export default PrivateRoute