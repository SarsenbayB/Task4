import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectIsAuth, setUserData } from "../../redux/slices/auth";
import { Button } from "react-bootstrap";
import axios from "../../axios";
import "./header.css";

const Header = () => {
  const [userName, setUserName] = useState("");
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  // Получение данных текущего пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUserData(data)); // Сохранение имени пользователя
        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    if (isAuth && !user) {
      fetchUserData();
    }
  }, [isAuth, user, dispatch]);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      setUserName(""); // Очищаем имя пользователя при выходе
    }
  };
  return (
    <div className="header">
      <div className="logo">
        <ul>
          <li>
            <a href="#">Task4</a>
          </li>
        </ul>
      </div>
      <div className="nav_btn">
        {isAuth ? (
          <>
            <div className="name">
              <h2>Hello, {user?.name || "User"}!</h2>{" "}
              {/* Отображаем имя пользователя */}
            </div>
            <nav className="exit__btn">
              <Link to={"/"}>
                <Button onClick={onClickLogout} href="#!" variant="prmary">
                  Logout
                </Button>
              </Link>
            </nav>
          </>
        ) : (
          <>
            <nav className="log__btn">
              <Link to={"/"}>
                <Button variant="primary">Log in</Button>
              </Link>
            </nav>
            <nav className="sign__btn">
              <Link to={"/Register"}>
                <Button variant="prmary">Register</Button>
              </Link>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
