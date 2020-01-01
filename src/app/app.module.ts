import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
const firebaseConfig = environment.firebaseConfig;

import { AngularFireModule } from '@angular/fire/';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { PostEffects } from './effects/post.effect';
import { PostReducer } from './reducers/post.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    EffectsModule.forRoot([PostEffects]),

    StoreModule.forRoot({
      post: PostReducer
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
