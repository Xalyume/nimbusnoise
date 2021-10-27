const GET_USERS = "users/GET_USERS"

const get = (users) => ({
    type: GET_USERS,
    payload: users
})

export const getUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users`);

    if (res.ok) {
        const query = await res.json();
        dispatch(get(query));
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USERS:
            newState = Object.assign({}, state)
            const allUsers = action.payload["users"]
            allUsers.forEach((user) => {
                newState[user.id] = user; });
            return newState;
        default:
            return state;
    }
}
