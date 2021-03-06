import React, { Component } from "react";
import PropTypes from "prop-types";
import { RaisedButton, Toggle, Paper, TextField } from "material-ui";

import Suggestions from "../../../components/Suggestions";

import "./styles";

const toggleStyle = {
  thumbOff: {
    backgroundColor: "#ffcccc"
  },
  trackOff: {
    backgroundColor: "#fff"
  },
  thumbSwitched: {
    backgroundColor: "#ed4242"
  },
  trackSwitched: {
    backgroundColor: "#fff"
  },
  labelStyle: {
    color: "red"
  }
};

const ShareForm = ({
  shareIsExpanded,
  showShareForm,
  addCompliment,
  toValue,
  bodyValue,
  handleToChange,
  handleBodyChange,
  suggestionsList,
  toggle
}) => {
  return (
    <div>
      <Paper
        id="share-container"
        className={`share-container ${shareIsExpanded
          ? "share-clicked"
          : "share-collapsed"}`}
        style={{ background: "#3c3737" }}
      >
        <Paper
          className="share-bar"
          zDepth={1}
          rounded={false}
          style={{ background: "rgb(115, 115, 115)" }}
          onClick={() => {
            showShareForm();
          }}
        >
          <span
            className={`share-button ${true
              ? "button-bounce"
              : "button-bounce"}`}
          >
            +
          </span>
        </Paper>
        <form
          onSubmit={addCompliment}
          id="compliment-form"
          className={shareIsExpanded ? "" : `hide`}
        >
          <div className="share-fields">
            <TextField
              value={toValue}
              className="share-to"
              id="share-to"
              name="shareTo"
              hintText="To."
              onChange={handleToChange}
              underlineFocusStyle={{
                borderColor: "#ed4242"
              }}
              hintStyle={{
                color: "rgba(255, 255, 255, 0.5)"
              }}
              inputStyle={{
                color: "#fff"
              }}
              autoComplete="off"
            />
            <TextField
              value={bodyValue}
              onChange={handleBodyChange}
              className="share-body"
              id="share-body"
              name="shareBody"
              hintText="Compliment"
              underlineFocusStyle={{
                borderColor: "#ed4242"
              }}
              hintStyle={{
                color: "rgba(255, 255, 255, 0.5)"
              }}
              inputStyle={{
                color: "#fff"
              }}
              textareaStyle={{
                color: "#fff"
              }}
              multiLine={true}
              autoComplete="off"
            />
            <Toggle
              label="Post as Anonymous"
              labelStyle={{
                color: "white"
              }}
              onToggle={toggle}
              style={{ padding: "1rem" }}
              thumbStyle={toggleStyle.thumbOff}
              trackStyle={toggleStyle.trackOff}
              thumbSwitchedStyle={toggleStyle.thumbSwitched}
              trackSwitchedStyle={toggleStyle.trackSwitched}
            />
            <RaisedButton
              label="Submit"
              type="submit"
              style={{ margin: 12 }}
              labelColor={"#fff"}
              overlayStyle={{ background: "#ed4242" }}
            />
          </div>
          <Suggestions suggestionsList={suggestionsList} />
        </form>
      </Paper>
    </div>
  );
};

ShareForm.propTypes = {
  suggestionsList: PropTypes.object
};

export default ShareForm;
