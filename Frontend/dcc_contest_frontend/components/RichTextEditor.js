import React, { useState, useEffect, useRef } from "react";
import ImageKit from "imagekit-javascript";

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
      authenticationEndpoint: "http://localhost:5000/auth/imagekitAuth",
    });

    function uploadAdapter(loader) {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            loader.file.then((file) => {
              imagekit.upload(
                {
                  file: file,
                  fileName: "trial.jpg",
                },
                function (err, result) {
                  if (err) {
                    console.log(err);
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
    <div>
      {editorLoaded ? (
        <CKEditor
          className="mt-3 wrap-ckeditor"
          editor={ClassicEditor}
          config={{ removePlugins: ['Heading'], extraPlugins: [uploadPlugin] }}
          onChange={(event,editor) => {
            const data = editor.getData();
            console.log(data);
            props.setValue(data);
          }}
          data={props.value}
            
        />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default MyCKEditor;
