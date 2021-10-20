const ADD_ALBUM = "albums/ADD_ALBUM"
const GET_ALBUMS = "albums/GET_ALBUMS"

const add = (album) => ({
    type: ADD_ALBUM,
    payload: album
})

const get = (album) => ({
    type: GET_ALBUMS,
    payload: album
})

export const addAlbum = (album) => async (dispatch) => {
    console.log(album)

    const res = await fetch('/api/albums', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
    })

    if (res.ok) {
        const newAlbum = await res.json();

        dispatch(add(newAlbum));

        return { ok: true };
    }
}


const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_ALBUM:
            newState = Object.assign({}, state)
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}
