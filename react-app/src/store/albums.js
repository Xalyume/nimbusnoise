const ADD_ALBUM = "albums/ADD_ALBUM";
const GET_ALBUMS = "albums/GET_ALBUMS";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

const add = (album) => ({
    type: ADD_ALBUM,
    payload: album
})

const get = (album) => ({
    type: GET_ALBUMS,
    payload: album
})

const del = (album) => ({
    type: DELETE_ALBUM,
    payload: album
})

export const addAlbum = (album) => async (dispatch) => {

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

        return { ok: true, id: newAlbum.id };
    } else {
        const response = await res.json();
        return { ok: false, errors: response.errors };
    }
}

export const getAlbum = () => async (dispatch) => {

    const res = await fetch(`/api/albums`);
    if (res.ok) {
        const query = await res.json();
        dispatch(get(query));
    }
}

export const deleteAlbumThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/albums/${id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        await res.json();
        dispatch(del(id));
        return null
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
        case GET_ALBUMS:
            newState = Object.assign({}, state)
            const allAlbums = action.payload;
            Object.values(allAlbums).forEach((album) => { newState[album.id] = album; });
            return newState;
        case DELETE_ALBUM:
            newState = Object.assign({}, state)
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}
