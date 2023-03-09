
export default function SearchBar(props){
    return (
        <>
            <div className="search-bar-container">
                <div className="search-bar-filter">
                    <select className="select select-success w-full" onChange={(event)=>{
                        props.setFilter(event.target.value);
                    }}>
                        <option selected disabled>Select an option to search</option>
                        {props.search_options.map((filter,index)=>(
                            <option key={index} value={index} selected={index===props.filter ?"selected" :""}>{filter}</option>
                        ))}
                        
                    </select>
                </div>
                <div className="search-bar-text-area">
                    <input type="text" placeholder="Enter to search" value={props.text} className="input input-bordered input-success w-full" onChange={(event)=>{
                        props.setText(event.target.value);
                    }} />
                </div>
                <div className="search-bar-icon">
                    <button className="btn btn-outline btn-success w-full " onClick={()=>{
                        props.triggerSearch();
                    }}>Search</button>
                
                </div>
            </div>
        </>
    )
}