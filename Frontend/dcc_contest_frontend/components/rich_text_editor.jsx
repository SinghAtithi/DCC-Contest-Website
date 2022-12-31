import React, { Component } from 'react'
import {EditorState} from "draft-js";
import dynamic from 'next/dynamic'; 
// import apiClient from '../api/api_client'
import { convertFromRaw, convertToRaw } from 'draft-js';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)


export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.setState({
      editorState,
    });
    // this.props.handleContent(
    //     convertToRaw(editorState.getCurrentContent()
    // ));
  };

  // uploadImageCallBack = async (file) => {
  //   console.log(file);
  // }
  uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/code-dcc");
      xhr.setRequestHeader("Authorization", `Client-ID ${process.env.CLIENT_ID}`);
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        console.log(xhr.responseText);
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={this.onEditorStateChange}
        // toolbarOnFocus
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { 
            urlEnabled: true,
            uploadEnabled: true,
            uploadCallback: this.uploadImageCallBack, 
            previewImage: true,
            alt: { present: false, mandatory: false } 
          },
        }}
      />
    )
  }
}