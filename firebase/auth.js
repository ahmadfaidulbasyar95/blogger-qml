firebase.initializeApp(firebaseConfig[0],);
var firebases = [null];
for (var i = 1; i < firebaseConfig.length; i++) {
  firebases[i] = firebase.initializeApp(firebaseConfig[i], 'App'+i);
}
const firestore = firebase.firestore();
var firestores = [null];
for (var i = 1; i < firebaseConfig.length; i++) {
  firestores[i] = firebases[i].firestore();
}

var firebaseSignInPage  = $('#firebaseSignInPage');
var firebaseSignOutPage = $('#firebaseSignOutPage');
var firebaseUserName    = $('.firebaseUserName');
var firebaseUserEmail   = $('.firebaseUserEmail');
var firebaseUserImage   = $('.firebaseUserImage').attr('referrerpolicy','no-referrer');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebaseUserName.text(user.displayName);
    firebaseUserEmail.text(user.email);
    firebaseUserImage.attr('src',user.photoURL);
    firebaseSignInPage.hide();
    firebaseSignOutPage.show();
    
    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        var s = 1;
        for (var i = 1; i < firebaseConfig.length; i++) {
          firebases[i].auth().signInWithCredential(
            result.credential
          ).then(() => {
            s++;
            if (s == firebaseConfig.length) {
              firebaseOnRegister(user);
            }
          }).catch((error) => {
            alert(error.message);
          });
        }
      }else{
        firebaseOnRegister(user);
      }
    }).catch((error) => {
      alert(error.message);
    });
  }else{
    firebaseSignOutPage.hide();
    firebaseSignInPage.show();
    if (typeof firebaseOnSignOut === 'function' || typeof firebaseOnSignOut === 'object') {
      firebaseOnSignOut();
    }
  }
});

function firebaseOnRegister(user) {
  if (typeof firebaseOnSignIn === 'function' || typeof firebaseOnSignIn === 'object') {
    var userData = firebaseLSDBC().get(user.email);
    userData.onsuccess = function () {
      if (userData.result) {
        user.data = userData.result;
        firebaseOnSignIn(user);
      }else{
        firestore.collection('mydata').doc(user.email).get().then((doc) => {
          if (doc.exists) {
            user.data = doc.data();
            firebaseLSDBC().add(user.data);
            firebaseOnSignIn(user);
          }else{
            user.data = {
              _creator:user.email,
              name: user.displayName,
              image: user.photoURL,
              type: firebaseUserConfig.def
            };
            firestore.collection('mydata').doc(user.email).set(user.data).then(() => {
              firebaseLSDBC().add(user.data);
              firebaseOnSignIn(user);
            }).catch((error) => {
              alert(error.message);
            });
          }
        }).catch((error) => {
          alert(error.message);
        });
      }
    }
  }
}
function firebaseSignIn(providerid) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    switch (providerid) {
      case 'facebook':
        var provider = new firebase.auth.FacebookAuthProvider();
        break;
      default:
        var provider = new firebase.auth.GoogleAuthProvider();
        break;
    }
    return firebase.auth().signInWithRedirect(provider);
  })
  .catch((error) => {
    alert(error.message);
  });
}
function firebaseSignOut(textQuestion,textResponse) {
  if (confirm(textQuestion)) {
    firebase.auth().signOut().then(() => {
      for (var i = 1; i < firebaseConfig.length; i++) {
        firebases[i].auth().signOut().catch((error) => {
          alert(error.message);
        });
      }
      alert(textResponse);
    }).catch((error) => {
      alert(error.message);
    });
  }
}

const myIndexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
if (!myIndexedDB) {
  alert("IndexedDB could not be found in this browser.");
}
window.firebaseLSDBC_ = myIndexedDB.open('firebaseLocalStorageDbCustom', 1);
window.firebaseLSDBC_.onupgradeneeded = function () {
  window.firebaseLSDBC_.result.createObjectStore('firebaseLocalStorage', {keyPath:'_creator'});
};
function firebaseLSDBC() {
  return window.firebaseLSDBC_.result.transaction('firebaseLocalStorage', 'readwrite').objectStore('firebaseLocalStorage');
};
