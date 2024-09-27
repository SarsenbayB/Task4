import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa";
import "../../style/toolbar.css";

const Toolbar = ({ selectedUsers, onBlock, onUnblock, onDelete }) => {
  return (
    <ButtonGroup className="toolbar">
      <Button
        variant="warning"
        onClick={onBlock}
        disabled={selectedUsers.length === 0}
      >
        <span className="button-icon">
          <FaLock className="icon" /> Block
        </span>
      </Button>
      <Button
        variant="warning"
        onClick={onUnblock}
        disabled={selectedUsers.length === 0}
      >
        <span className="button-icon">
          <FaLockOpen className="icon" /> Unblock
        </span>
      </Button>
      <Button
        variant="danger"
        onClick={onDelete}
        disabled={selectedUsers.length === 0}
      >
        <span className="button-icon">
          <FaTrash className="icon" /> Delete
        </span>
      </Button>
    </ButtonGroup>
  );
};

export default Toolbar;
