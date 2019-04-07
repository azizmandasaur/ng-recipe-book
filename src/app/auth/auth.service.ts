import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: string;

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    signInuser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        )
                    this.router.navigate(['/']);
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
    }
}