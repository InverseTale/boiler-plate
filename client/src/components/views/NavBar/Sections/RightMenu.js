import React from 'react';
import {Menu} from 'antd';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {useSelector} from "react-redux";

function RightMenu(props) {
    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.status === 200) {
                    props.history.push("/login");
                } else {
                    alert('Logout Failed!');
                }
            });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key={"mail"}>
                    <a href={"/login"}>Sing In</a>
                </Menu.Item>
                <Menu.Item key={"app"}>
                    <a href={"/register"}>Sign Up</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key={"logout"}>
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);
