import React, { useEffect } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import code from "./snippet";
import { setConfig } from "next/config";
import CodeAreaSkeleton from "../skeleton/CodeAreaSkeleton";

function CodeEditor(props) {
  /*
  props includes:  Code, setCode, ProblemId
*/
  return (
    props.loader ? <CodeAreaSkeleton width={props.width} height="80vh" /> :
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
          <button
            className="btn btn-outline btn-success"
            onClick={props.onSubmit}
          >
            Submit
          </button>
          <button className="btn btn-outline btn-success" id="button-below" onClick={props.controlConsole}>
            Console
          </button>
        </div>
      </div>)
  );
}

export default CodeEditor;
