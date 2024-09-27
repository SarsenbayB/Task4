import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import "./register.css";

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      position: "",
      email: "Sarsenbay@test.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if (!data.payload) {
      return alert("Не удалось зарегистрироваться!");
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
      <div className="register">
        <div className="rootsregister">
          <h5 className="title">Register</h5>
          <input
            className={`field ${errors.name ? "error" : ""}`}
            type="text"
            placeholder="Ф.И.О"
            {...register("name", { required: "Укажите полное имя" })}
          />
          {errors.name && <p className="errorText">{errors.name?.message}</p>}
          <input
            className={`field ${errors.position ? "error" : ""}`}
            type="text"
            placeholder="Position"
            {...register("position", { required: "Укажите позицию" })}
          />
          {errors.Position && (
            <p className="errorText">{errors.Position?.message}</p>
          )}
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
            Register
          </button>
          <Link className="linkPage" to={"/"}>
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
