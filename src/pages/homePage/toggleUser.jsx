import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class SimpleSplitMenuButton extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const topStyle = {
      borderWidth: "1px",
      borderStyle: "solid",
      width: "140px",
      display: "inline-block",
      margin: "10px"
    };

    const topHandler = (event) => {
      //      alert("event: " + event.key);
      if (event.key === "ArrowDown") {
        this.handleClick(event);
      } else if (event.key === "Enter") {
        alert("action");
      }
    };

    return (
      <div>
        <span
          style={topStyle}
          tabindex={0}
          onKeyDown={topHandler}
          role="button"
          aria-roledescription="split menu button, down arrow for menu"
          aria-haspopup="menu"
          aria-expanded={Boolean(anchorEl)}
          aria-owns={anchorEl ? "simple-menu" : undefined}
        >
          <Button tabindex={-1} onClick={(event) => alert("action")}>
            Profile
          </Button>
          <Button onClick={this.handleClick} tabIndex={-1}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path>
            </svg>
          </Button>
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleSplitMenuButton;
