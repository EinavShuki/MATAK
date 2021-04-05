import React from "react";
import Button from "@material-ui/core/Button";

function ActionButtons({ onOk, onCancel }) {
  return (
    <div className="action-buttons">
      <Button
        variant="contained"
        color="primary"
        onClick={() => onOk()}
        style={{
          marginRight: "3px",
        }}
      >
        Confirm
      </Button>
      <Button variant="contained" color="secondary" onClick={() => onCancel()}>
        Cancel
      </Button>
    </div>
  );
}

export default ActionButtons;
