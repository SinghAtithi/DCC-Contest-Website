import React from 'react';

export default function TestCaseContainer({ index, input, output, explanation }) {
    return (
        <div>
            <h1>Test Case : {index}</h1>
            <div className="problem-test-case-preview-area">
                <span>Input</span>
                <div className="problem-test-case-preview-area-data">
                    <pre>{input}</pre>
                </div>

                <hr></hr>

                <span>Output</span>
                <div className="problem-test-case-preview-area-data">
                    <pre>{output}</pre>
                </div>

                {explanation &&
                    <>
                        <hr></hr>
                        <span>Explanation</span>
                        <div className="problem-test-case-preview-area-data">
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: explanation }}></p>
                        </div>
                    </>}
            </div>
        </div>
    )
}
