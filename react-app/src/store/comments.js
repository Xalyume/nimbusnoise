const ADD_COMMENT = "comments/ADD_COMMENT";
const GET_COMMENTS = "comments/GET_COMMENTS";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DEL_COMMENT = "comments/DEL_COMMENT";

const add = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

const get = (comment) => ({
    type: GET_COMMENTS,
    payload: comment,
});

const edit = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment,
})

const del = (comment) => ({
    type: DEL_COMMENT,
    payload: comment,
})

export const addCommentThunk = (comment) => async (dispatch) => {

    const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    if (res.ok) {
        const newComment = await res.json();
        dispatch(add(newComment));

        return { ok: true };
    }
};

export const getCommentThunk = () => async(dispatch) => {
    const res = await fetch("/api/comments")

    if (res.ok) {
        const comments = await res.json();
        dispatch(get(comments));
    }
}

export const deleteCommentThunk = (id) => async (dispatch) => {
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
        case ADD_COMMENT:
            newState = Object.assign({}, state)
            newState[action.payload.id] = action.payload;
            return newState;
        case GET_COMMENTS:
            newState = Object.assign({}, state)
            const allComments = action.payload;
            Object.values(allComments).forEach((comment) => { newState[comment.id] = comment });
            return newState;
        case EDIT_COMMENT:
            newState[action.payload.id]["content"] = action.payload.content;
            return newState;
        case DEL_COMMENT:
            newState = Object.assign({}, state)
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}
