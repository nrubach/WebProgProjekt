class Database {
    static firebaseConfig;
    static firebase;
    static database;
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyCx-TZAvj_WmBHOqldZE3rQTKY3LZwuIBU",
            authDomain: "webprogrammierung-93602.firebaseapp.com",
            databaseURL: "https://webprogrammierung-93602.firebaseio.com",
            projectId: "webprogrammierung-93602",
            storageBucket: "webprogrammierung-93602.appspot.com",
            messagingSenderId: "1019422608610",
            appId: "1:1019422608610:web:a99e7c267cf5203c77a2bb"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
    }
}
