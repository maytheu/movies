import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import "./auth/sign.css";
import AdminLayout from "../hoc/AdminLayout";
import { aboutAdmin, contact, editAboutAdmin } from "../../actions/adminActions";

class About extends Component {
  state = {
    editorState: EditorState.createEmpty(), 
	id: '',
	numLength: 0
  };
  
    componentDidMount() {
    this.props.dispatch(contact()).then(() => {
				    let about = this.props.contact.contact;
		const contentState = ContentState.createFromBlockArray(htmlToDraft(about.about).contentBlocks)
		const editorState = EditorState.createWithContent(contentState)
      this.setState({
editorState,
id: about._id
      });
    });
  }

  onEditorStateChange = editorState => {
    this.setState( {
      editorState, 
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let convertedData = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
	if(this.state.id === ''){
		    this.props.dispatch(aboutAdmin({about: convertedData}));
	}else{
				    this.props.dispatch(editAboutAdmin({about: convertedData, id: this.state.id}));
	}
    console.log(convertedData);
  };

  render() {
    const { editorState } = this.state;
	console.log(this.state)
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
                "image"
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true }
            }}
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
        <Button onClick={this.submitHandler}>Add Contact Details</Button>
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())).length
          }}
        />
      </AdminLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    contact: state.admin
  };
}

export default connect(mapStateToProps)(About);
