import React,{useState} from 'react'

const FilterByCategorie = ({categories,handleFilters}) => {
    const[checked] = useState(new Set())
    const handleCategory = (cat) =>{
        if(checked.has(cat._id)){
            checked.delete(cat._id)
        }else{
            checked.add(cat._id)
        }
        handleFilters(Array.from(checked))
    }

    return (
        <div>
            <h4>Filter by Caategories</h4>
            <ul>
                {categories && categories.map((cat,i)=>(
                <li key={i} className="list-unstyled my-3">
                    <input onChange={()=>handleCategory(cat)} value={cat._id} type="checkbox" name={cat.name} id={i} className="form-check-input" />
                    <label htmlFor={cat.name} className="form-check-label ml-3">{cat.name}</label>
                </li> 
                ))}
            </ul>
        </div>
    )
}

export default FilterByCategorie
