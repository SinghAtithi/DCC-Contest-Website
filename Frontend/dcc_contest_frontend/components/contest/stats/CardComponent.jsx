import React from 'react'

export default function CardComponent(props) {
    return (
        <div className="card rounded-lg w-full h-full bg-yellow-50 text-black font-serif">
            <div className="card-body !p-2">
                <h2 className="card-title"><p className='text-center'>{props.title}</p></h2>
                <hr />
                <p className='text-center'>{props.value}</p>
            </div>
        </div>
    )
}
