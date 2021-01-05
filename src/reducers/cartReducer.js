let items = JSON.parse(localStorage.getItem('cart')) || []
let myState = {
    products:  items,
    count: items.reduce((total,product) => total=total + product.count,0 )
}

const cartReducer = (state = myState, action) =>{

    switch (action.type) {
        case 'ADDITEM':
            return {
                ...state,
                products: action.payload,
                count: action.payload.reduce((total,product) => total=total + product.count,0 )
            }
            case 'INCPRODUCTCOUNT':
                return {
                    ...state,
                    products: action.payload,
                    count: state.count+1
                }
                case 'DECPRODUCTCOUNT':
                     return {
                            ...state,
                            products: action.payload,
                            count: state.count-1
                        }   
                
            case 'DELETEPRODUCT':
                return {
                       ...state,
                       products: action.payload,
                       count: action.payload.reduce((total,product) => total=total + product.count,0 )
                   }   
                   
        default:
            return state;
    }
}

export default cartReducer;