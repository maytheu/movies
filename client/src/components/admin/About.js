import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import "./auth/sign.css";
import AdminLayout from "../hoc/AdminLayout";
import { aboutAdmin, editAboutAdmin } from "../../actions/adminActions";

class About extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    id: "",
    numLength: 0,
    valid: false,
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  parseHtmlString = (text) => {
    return text.replace(/(<([^>]+)>)/gi, "").length;
  };

  messagePage = (msgLength) => {
    if (msgLength <= 140) {
      return 1;
    } else {
      return Math.floor(msgLength / 140) + 1;
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    let convertedData = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    if (this.state.id === "") {
      this.props.dispatch(aboutAdmin({ about: convertedData }));
    } else {
      this.props.dispatch(
        editAboutAdmin({ about: convertedData, id: this.state.id })
      );
    }
  };

  render() {
    const { editorState } = this.state;
    console.log(this.state);
    return (
      <AdminLayout>
        <div className="auth">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="editer-content"
            toolbar={{
              options: [
                "inline",
                "list",
                "colorPicker",
                "link",
                "emoji",
                "image",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
            onBlur={() => this.setState({ valid: true })}
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
        <Button onClick={this.submitHandler} disabled={!this.state.valid}>
          Add Contact Details
        </Button>
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
              .length,
          }}
        />
        <div>{draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div>
        <div>
          {this.parseHtmlString(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          )}
        </div>
        <div>
          {this.messagePage(
            this.parseHtmlString(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            )
          )}
        </div>
      </AdminLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    contact: state.admin,
  };
}

export default connect(mapStateToProps)(About);
