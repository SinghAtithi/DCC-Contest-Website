import React from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import Countdown from "./Countdown";
import moment from "moment";
import EditorSkeleton from "./skeleton/EditorSkeleton";


function CodeEditor(props) {
  /*
  props includes:  Code, setCode, ProblemId
*/
  // Retrieve the loggedIn state using the useSelector hook
  const { loggedIn } = useSelector(state => state.login);


  return (
    props.loader ? <EditorSkeleton /> :
      (<div className="code-editor-area">
        <div className="code-editor">
          <Editor
            height={props.EditorHeight}
            defaultLanguage="cpp"
            value={props.Code}
            onChange={(value) => {
              props.setCode(value);
              localStorage.setItem(props.ProblemId, value);
            }}
            theme="vs-dark"
            options={{
              acceptSuggestionOnCommitCharacter: true,
              acceptSuggestionOnEnter: "on",
              contentWidth: 100,
              fontSize: 16,
              // size of font
              accessibilitySupport: "auto",
              autoIndent: true,
              automaticLayout: true,
              codeLens: false,
              colorDecorators: true,
              contextmenu: true,
              cursorBlinking: "blink",
              cursorSmoothCaretAnimation: true,
              cursorStyle: "line",
              disableLayerHinting: false,
              disableMonospaceOptimizations: false,
              dragAndDrop: true,
              fixedOverflowWidgets: false,
              folding: true,
              foldingStrategy: "auto",
              fontLigatures: true,
              formatOnPaste: true,
              formatOnType: true,
              hideCursorInOverviewRuler: false,
              highlightActiveIndentGuide: true,
              links: true,
              mouseWheelZoom: false,
              multiCursorMergeOverlapping: true,
              multiCursorModifier: "alt",
              overviewRulerBorder: true,
              overviewRulerLanes: 0,
              quickSuggestions: true,
              quickSuggestionsDelay: 100,
              readOnly: false,
              renderControlCharacters: false,
              renderFinalNewline: true,
              renderIndentGuides: true,
              renderLineHighlight: "all",
              renderWhitespace: "none",
              revealHorizontalRightPadding: 0,
              roundedSelection: true,
              rulers: [],
              scrollBeyondLastColumn: 5,
              scrollBeyondLastLine: true,
              selectOnLineNumbers: true,
              selectionClipboard: true,
              selectionHighlight: true,
              showFoldingControls: "mouseover",
              smoothScrolling: false,
              suggestOnTriggerCharacters: true,
              wordBasedSuggestions: true,
              wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
              wordWrap: "on",
              wordWrapBreakAfterCharacters: "\t})]?|&,;",
              wordWrapBreakBeforeCharacters: "{([+",
              wordWrapBreakObtrusiveCharacters: ".",
              wordWrapColumn: 50,
              wordWrapMinified: true,
              wrappingIndent: "none",
            }}
          />
        </div>
        <div className="code-editor-area-button-area">
          {loggedIn ? <button
            className={`btn btn-outline btn-success ${props.submitting}`}
            onClick={props.onSubmit}
          >
            Submit
          </button> : <button
            className="btn btn-outline btn-error disabled tooltip tooltip-warning" data-tip="You need to login to submit the code."
          >
            Submit
          </button>}
          <button className="btn btn-outline btn-success" id="button-below" onClick={props.controlConsole}>
            Console
          </button>
          {props.countdownRequired && <div className="ContestCountdown-container">
            <div className="ContestCountdown">
              <Countdown deadline={props.deadline} />
            </div>
          </div>}
        </div>
      </div>)
  );
}

export default CodeEditor;
