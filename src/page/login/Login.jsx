import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "Sarsenbay@test.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(data);
    if (!data.payload) {
      return alert("Не удалось войти!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  // console.log("isAuth", isAuth);

  if (isAuth) {
    return <Navigate to="/UserTable" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login">
        <div className="rootslogin">
          <h5 className="title">Log in</h5>
          <input
            className={`field ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="E-Mail"
            {...register("email", { required: "Укажите почту" })}
          />
          {errors.email && <p className="errorText">{errors.email?.message}</p>}
          <input
            className={`field ${errors.password ? "error" : ""}`}
            type="password"
            placeholder="Пароль"
            {...register("password", { required: "Укажите пороль" })}
          />
          {errors.password && (
            <p className="errorText">{errors.password?.message}</p>
          )}

          <button disabled={!isValid} type="submit" className="button">
            Log in
          </button>
          <Link className="linkPage" to={"/Register"}>
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
