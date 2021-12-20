import React, { useReducer, useContext } from 'react';

const UserContext = React.createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
            let user = JSON.parse(localStorage.getItem('setUser'))
            return {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                token: action.payload.token,
                screen: user ? user.screen : 'Notes',
                view: user ? user.view : 'List'
            };
        case 'SIGNUP':
            // let user = JSON.parse(localStorage.getItem('setUser'))
            return {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                token: action.payload.token,
                screen: 'Notes',
                view: 'List'
            };
        case 'SCREEN_PREFERENCE':
            return {
                ...state,
                screen: action.payload.screen ? action.payload.screen : state.screen,
                view: action.payload.view ? action.payload.view : state.view
            }
        case 'LOGOUT':
            return {
                firstName: '',
                lastName: '',
                email: '',
                token: ''
            }
        default:
            return state
    }
}

let initialState = {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    screen: '',
    view: 'List'
}

export const UserProvide = ({ children }) => {
    let user = JSON.parse(localStorage.getItem('setUser')) || { name: '', email: '', token: '' }
    if (user.token) {
        initialState.firstName = user.firstName
        initialState.lastName = user.lastName
        initialState.email = user.email
        initialState.token = user.token
        initialState.screen = user.screen
        initialState.view = user.view
    }

    const [userState, userDispatch] = useReducer(userReducer, initialState);

    return (
        <>
            <UserContext.Provider value={{ user: userState, userDispatch }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}