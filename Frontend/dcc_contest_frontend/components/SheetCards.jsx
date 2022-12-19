import React from "react";

function SheetCards(props) {
  return (
    <div className="roundedCustom">
      <div className="card w-96 bg-base-100 m-10 shadow-2xl image-full">
        <figure>
          <img src={props.imageURL} alt={props.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SheetCards;
