const redux=require('redux')
const createStore=redux.createStore
const combineReducer=redux.combineReducers
const bindActionCreators=redux.bindActionCreators
const applyMiddleware=redux.applyMiddleware
const reduxLogger=require('redux-logger')
const logger=reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAME_ORDERED = "ICECREAME_ORDERED"
const ICECREAME_RESTOCKED = "ICECREAME_RESTOCKED"

const cakeOrdered = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const cakeReStoked = (qnt=1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qnt
    }
}

const iceCreameOrdered = () => {
    return {
        type: ICECREAME_ORDERED,
        payload: 1
    }
}
const iceCremeReStocked = (qnt=1) => {
    return {
        type: ICECREAME_RESTOCKED,
        payload: qnt
    }
}

const cakeInitilState = {
    nimberOfCake:10,
}

const iceCreameInitilState = {
    numberOfIceCreame:20,
}

// (previouseState,action)=>newState

const cakeReducer = (state = cakeInitilState, action) => {
    switch (action.type) {
        case 'CAKE_ORDERED':
        return{
            ...state,
            nimberOfCake:state.nimberOfCake-action.payload
        }
        case 'CAKE_RESTOCKED':
            return{
                ...state,
                nimberOfCake:state.nimberOfCake+action.payload
            }
        default:
            return state
    }
}

const iceCreameReducer = (state = iceCreameInitilState, action) => {
    switch (action.type) {
        case 'ICECREAME_ORDERED':
        return{
            ...state,
            numberOfIceCreame:state.numberOfIceCreame-action.payload
        }
        case 'ICECREAME_RESTOCKED':
            return{
                ...state,
                numberOfIceCreame:state.numberOfIceCreame+action.payload
            }
        default:
            return state
    }
}

const rootReducer=combineReducer({
    cake:cakeReducer,
    iceCreame:iceCreameReducer
})

// Create Store with createStore method
const store=createStore(rootReducer,applyMiddleware(logger))

// combine all action with bundactionActionCreators method
const action=bindActionCreators({cakeOrdered,cakeOrdered,iceCreameOrdered,iceCremeReStocked},store.dispatch)

console.log("initialState",store.getState())
// store.subscribe(()=>{})

// store.dispatch(cakeOrdered())
// store.dispatch(cakeOrdered())
// store.dispatch(cakeOrdered())
// store.dispatch(cakeOrdered(3))
// store.dispatch(iceCreameOrdered())
// store.dispatch(iceCreameOrdered())
// store.dispatch(iceCremeReStocked(2))


action.cakeOrdered()
action.cakeOrdered()
action.cakeOrdered()
action.cakeOrdered(3)
action.iceCreameOrdered()
action.iceCreameOrdered()
action.iceCremeReStocked(2)