function EditorSkeleton() {
    return (
        <div className="EditorSkeleton-container">
            <div className="animated-background mt-1" style={{ width: "100%", height: "100%" }}></div>
            <div className="flex">
                <div className="animated-background mt-1 mx-1" style={{ width: "25%", height: "48px" }}></div>
                <div className="animated-background mt-1 mx-1" style={{ width: "25%", height: "48px" }}></div>
            </div>


        </div>
    );
}
export default EditorSkeleton;
