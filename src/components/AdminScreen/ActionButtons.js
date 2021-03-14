import React from 'react'
import Button from "@material-ui/core/Button";

function ActionButtons() {
  return (
    <div className="action-buttons">
      <Button
        variant="contained"
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
        style={{ backgroundColor: "#f44336", color: "#fff" }}
      >
        Cancel
      </Button>
    </div>
  );
}

export default ActionButtons
