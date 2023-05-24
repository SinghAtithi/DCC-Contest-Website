import React, { useState, useEffect, useRef } from "react";
import EditorSkeleton from "./skeleton/EditorSkeleton";

import ImageKit from "imagekit-javascript";
import { BASE_URL } from "../utils/constants";

const MyCKEditor = (props) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("../ckeditor5-build-with-htmlembed-master"),
    };
    setEditorLoaded(true);
  }, []);

  var imagekit = new ImageKit({
    publicKey: "public_/8n1ylBbpeZ+hb/0ttpwZxVDshE=",
    urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/Code-DCC",
    authenticationEndpoint: `${BASE_URL}/auth/imagekitAuth`,
  });

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            imagekit.upload(
              {
                file: file,
                fileName: "problem.jpg",
              },
              function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  const url = imagekit.url({
                    src: result.url,
                    transformation: [{ height: 200, width: 200 }],
                  });

                  resolve({ default: url });
                }
              }
            );
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = function (
      loader
    ) {
      return new uploadAdapter(loader);
    };
  }

  return (
    <div className="editor-div">
      {editorLoaded ? (
        <CKEditor
          className="wrap-ckeditor"
          editor={ClassicEditor}
          config={{ removePlugins: ['Heading'], extraPlugins: [uploadPlugin] }}
          onChange={(event, editor) => {
            const data = editor.getData();
            props.setValue(data);
          }}
          data={props.value}

        />
      ) : (
        <EditorSkeleton />
      )}
    </div>
  );
};

export default MyCKEditor;
