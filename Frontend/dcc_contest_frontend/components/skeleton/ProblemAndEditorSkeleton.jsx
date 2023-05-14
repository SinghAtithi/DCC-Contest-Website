import React from 'react';
import QuestionSkeleton from './QuestionSkeleton';
import EditorSkeleton from "./EditorSkeleton";

export default function ProblemAndEditorSkeleton() {
    return (
        <div className="problem-page">
            <div className="problem-page-left">
                <QuestionSkeleton />
            </div>
            <div className="problem-page-right">
                <div className="problem-page-right-top" style={{ height: "calc(90vh - 80px) " }}>
                    <EditorSkeleton />
                </div>
            </div>
        </div>
    )
}
