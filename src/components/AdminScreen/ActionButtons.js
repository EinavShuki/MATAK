import React from 'react'
import Button from "@material-ui/core/Button";

function ActionButtons({onOk, onCancel}) {
  return (
    <div className="action-buttons">
      <Button
        variant="contained"
        onClick={() => onOk()}
        style={{
          backgroundColor: "#00c853",
          color: "#fff",
          marginRight: "3px",
        }}
      >
        Confirm
      </Button>
      <Button
        variant="contained"
        onClick={() => onCancel()}
        style={{ backgroundColor: "#f44336", color: "#fff" }}
      >
        Cancel
      </Button>
    </div>
  );
}

export default ActionButtons
