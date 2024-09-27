import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Table, Form } from "react-bootstrap";
import Toolbar from "./Toolbar";
import "../../style/userTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleAction = async (action) => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedUsers.map((userId) =>
          axios({
            method: action === "delete" ? "delete" : "put",
            url: `/users/${action === "delete" ? "" : action + "/"}${userId}`,
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      // Если удаление, фильтруем удаленных пользователей из текущего состояния
      if (action === "delete") {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUsers.includes(user._id))
        );
      }

      // Очищаем выделенные пользователи
      setSelectedUsers([]);

      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error(`Error ${action}ing users:`, error);
    }
  };

  return (
    <>
      <Toolbar
        selectedUsers={selectedUsers}
        onBlock={() => handleAction("block")}
        onUnblock={() => handleAction("unBlock")}
        onDelete={() => handleAction("delete")}
      />
      <Table className="user-table" striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUsers.length === users.length}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleSelect(user._id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.lastLogin).toLocaleString()}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
