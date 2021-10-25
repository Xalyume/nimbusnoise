const ADD_SONG = "songs/ADD_SONG";
const GET_SONG = "songs/GET_SONG";
const EDIT_SONG = "songs/EDIT_SONG";
const DEL_SONG = "songs/DEL_SONG";

const add = (song) => ({
    type: ADD_SONG,
    payload: song,
});

const get = (song) => ({
    type: GET_SONG,
    payload: song,
});

const edit = song => ({
    type: GET_SONG,
    payload: song,
})

const del = song => ({
    type: DEL_SONG,
    payload: song,
})

export const addSongThunk = (formData) => async (dispatch) => {

    const res = await fetch("/api/songs", {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const newSong = await res.json();
        dispatch(add(newSong));

        return { ok: true, id: newSong.id }
    } else {
        const response = await res.json();
        return response
    }
};

export const getSongThunk = () => async (dispatch) => {

    const res = await fetch(`/api/songs`);
    if (res.ok) {
        const query = await res.json();
        dispatch(get(query));
    }
}

export const editSongThunk = (data) => async (dispatch) => {
    const res = await fetch(`/api/songs/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.title),
    });

    if (res.ok) {
        const query = await res.json();

        dispatch(edit(query));
        return { ok: true };
    }
}

export const delSongThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/songs/${id}`, {
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
        case ADD_SONG:
            newState = Object.assign({}, state)
            newState[action.payload.id] = action.payload;
            return newState;
        case GET_SONG:
            newState = Object.assign({}, state)
            const allSongs = action.payload;
            Object.values(allSongs).forEach((song) => { newState[song.id] = song; });
            return newState;
        case EDIT_SONG:
            newState[action.payload.id]["title"] = action.payload.title;
            return newState;
        case DEL_SONG:
            newState = Object.assign({}, state)
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}
