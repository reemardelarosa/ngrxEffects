import { Post } from './../models/post.model';
import * as PostActions from '../actions/post.action';

export type Action = PostActions.All;

export function PostReducer(state: Post, action: Action) {
    switch(action.type) {
        case PostActions.GET_POST:
            return { ...state, loading: true };
        case PostActions.GET_POST_SUCCESS:
            return { ...state, ...action.payload, loading: false };
        case PostActions.GET_POST_FAIL:
            return { ...state, loading: false };
        case PostActions.VOTE_UPDATE:
            return { ...state, ...action.payload.post, loading: true };
        case PostActions.VOTE_SUCCESS:
            return { ...state, loading: false };
        case PostActions.VOTE_FAIL:
            return { ...state, ...action.payload.post, loading: false };
        default:
            return state;
    }
}