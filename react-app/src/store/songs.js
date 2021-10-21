const ADD_SONG = "songs/ADD_SONG";
const GET_SONG = "songs/GET_SONG";

const add = (song) => ({
    type: ADD_SONG,
    payload: song,
});

const get = (song) => ({
    type: GET_SONG,
    payload: song,
});

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
        default:
            return state;
    }
}
