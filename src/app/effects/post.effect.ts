import { Post } from './../models/post.model';
import { map, mergeMap, catchError, delay, switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';


import * as PostActions from '../actions/post.action';
export type Action = PostActions.All;

@Injectable()
export class PostEffects {
    
    getPost$ = createEffect(() => this.actions$.pipe(
        ofType(PostActions.GET_POST),
        map((action: PostActions.GetPost) => action.payload),
        delay(1000),
        switchMap(payload  => this.db.object(payload).snapshotChanges()),
        map(action => {
            const key = action.payload.key;
            return { key, ...action.payload.val() };
        }),
        map((post: Post) => {
            post.pushKey = post.key;
            return new PostActions.GetPostSuccess(post);
        })
    ));

    voteUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(PostActions.VOTE_UPDATE),
        map((action: PostActions.VoteUpdate) => action.payload),
        mergeMap(payload => of(this.db.object('posts/' + payload.post.pushKey)
            .update({
                votes: payload.post.votes + payload.val
            }))),
        delay(1000),
        map(() => new PostActions.VoteSuccess()),
    ));
        
    constructor(private actions$: Actions, private db: AngularFireDatabase) {}
}