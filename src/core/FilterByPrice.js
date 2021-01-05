import React from 'react'

const FilterByPrice = ({handleFilters}) => {
    const price =[
        {
            _id:1,
            name:"any",
            value:[]
        },{
            _id:2,
            name:"0$ to 39$",
            value:[0, 39]
        },{
            _id:3,
            name:"40$ to 79$",
            value:[40, 79]
        },{
            _id:4,
            name:"80$ to 119$",
            value:[80, 119]
        },{
            _id:5,
            name:"120$ to 400$",
            value:[120, 400]
        },{
            _id:6,
            name:"More",
            value:[161, 9999999]
        }
    ]
    const handlePrice = (e) =>{
        handleFilters(price[e.target.value]['value'])
    }
    return (
        <div>
            <h4>Filter by Price</h4>
            {price.map((pric,i)=>(
                <div key={i} className="my-2">
                    <label htmlFor={`${i}-${pric.name}`}>
                        <input value={i} onChange={handlePrice} className="mx-3" type="radio" name="price" id={`${i}-${pric.name}`}/>
                        {pric.name}
                    </label>
                </div>
            ))

            }
        </div>
    )
}

export default FilterByPrice
