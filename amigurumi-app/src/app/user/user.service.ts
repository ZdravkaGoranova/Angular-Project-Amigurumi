import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/compat/auth';

// import { getDatabase, ref, set, child, get } from "firebase/database";
import { getDatabase, ref, set, child, get, } from "firebase/database";
import { getAuth, getIdToken, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {
  Firestore, 
} from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDataа!: Observable<any>;

  loggedInUserId: string | null = null;

  user: User | undefined;


  // gender: string = '';


  USER_KYE = '[user]';


  get isLogged(): boolean {
    return !!this.user;
  }

  // get isMale(): boolean {
  //   return this.user?.gender === 'male';
  // }

  // get isFemale(): boolean {
  //   return this.user?.gender === 'female';
  // }

  constructor(

    private http: HttpClient,
    private fireauth: AngularFireAuth,
    private router: Router,
    private firestore: Firestore,
    private apiService: ApiService
  ) {

    // this.getData();
    try {
      const lsUser = localStorage.getItem(this.USER_KYE) || '';
      this.user = JSON.parse(lsUser);

    } catch (error) {
      this.user = undefined;
    }
  }

  // isProductOwner(productId: string): boolean {
  //   const loggedInUser = this.getUser();
  //   if (!loggedInUser) {
  //     return false;
  //   }

    // Get the product by its ID
    // const product = this.apiService.getCurrentProduct(productId);

    // console.log(product.ownerId)
    // Check if the logged-in user is the owner of the product
    // return product && product.ownerId === loggedInUser.id;
  // }


  login(email: string, password: string) {
    // this.fireauth.signInWithEmailAndPassword(email, password)
    //   .then(async () => {
    //     const userRef = doc(this.firestore, 'users', email);
    //     const userSnapshot = await getDoc(userRef);

    //     if (userSnapshot.exists()) {
    //       const userData = userSnapshot.data();
    //       console.log(userData)
    //       debugger;
    //       this.user = {
    //         email: email,

    //         fullName: 'userData.fullName',
    //         // gender:' userData.gender',

    //       };

    //       localStorage.setItem(this.USER_KYE, JSON.stringify(this.user));
    //       this.router.navigate(['/profile']);
    //     } else {
    //       alert('User not found in Firestore.');
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // this.fullName = email;
        // this.user = {
        //   email: email,
        //   fullName: this.fullName,
        // gender: this.gender,
        // };
 
        const eml = userCredential.user?.email || '';
        //  console.log(eml)

        this.loggedInUserId = userCredential.user?.uid || '';
        // console.log(this.loggedInUserId)
        const userData = {
          email: eml,
          id: this.loggedInUserId,
        }

        this.user = userData;
        localStorage.setItem(this.USER_KYE, JSON.stringify(userData));

        alert(':)))))))')
        this.router.navigate(['/profile'])

      }, err => {

        alert(err.message);

        this.router.navigate(['/login'])
      })

    // this.user = {
    //   email: 'niki@abv.bg',
    //   fullName: 'Niki',
    //   gender: 'male',
    // };

    // localStorage.setItem(this.USER_KYE, JSON.stringify(this.user));
    // return this.http.post('/api/login', { email, password });
  }

  register(fullName: string, email: string, password: string) {

    const auth = getAuth();
    let uid = '';

    // const collectionInstance = collection(this.firestore, 'users');
    // addDoc(collectionInstance, { fullName, email, password, gender })
    //   .then(() => {
    //     console.log('Datasaved successful')
    //     this.router.navigate(['/profile']);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //     this.router.navigate(['/register']);
    //   })


    // this.fullName = fullName;
    // this.gender = gender;

    createUserWithEmailAndPassword(auth, email, password)
      // this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
 
        const user = userCredential.user;
        let userId = user.uid;



        this.loggedInUserId = userCredential.user?.uid || null;
        console.log(this.loggedInUserId)


        const eml = userCredential.user?.email || '';
        //  console.log(eml)

        this.loggedInUserId = userCredential.user?.uid || '';
        // console.log(this.loggedInUserId)
        const userData = {
          email: eml,
          id: this.loggedInUserId,
        }

        this.user = userData;

        // Set the custom user properties
        // user?.updateProfile({
        //   displayName: fullName,

        // }).then(() => {
        //   this.user = {
        //     email: email,
        //     fullName: fullName,
        //     // gender: gender,
        //   };



        // this.user = {
        //   email: user.email,
        //   id: userId,
        // };
        localStorage.setItem(this.USER_KYE, JSON.stringify(userData));
        // writeUserData(userId, fullName);

        alert('Registration Successful');
    
        this.router.navigate(['/profile']);
      }).catch((error) => {
        console.log(error.message);
      });

    // function writeUserData(userId: string, fullName: string) {
    //   const db = getDatabase();

    //   set(ref(db, 'users/' + userId), {
    //     displayName: fullName

    //   });
    //   console.log(db)
    // }

  }

  // getData() {
  //   const collectionInstance = collection(this.firestore, 'users');
  //   collectionData(collectionInstance, { idField: 'id' })
  //     .subscribe(val => {
  //       console.log(val)
  //     })
  //   this.userData = collectionData(collectionInstance, { idField: 'id' });
  // }

  // updateData(id: string) {
  //   const docInstance = doc(this.firestore, 'users', id)
  //   const updateData = {
  //     name: 'updateName'
  //   }
  //   updateDoc(docInstance, updateData).then(() => {
  //     console.log('Data  update')
  //   }).catch((err) => {
  //     console.log(err)
  //   })

  // }
  // deleteData(id: string) {
  //   const docInstance = doc(this.firestore, 'users', id)
  //   deleteDoc(docInstance).then(() => {
  //     console.log('Data  delete')
  //   })
  // }

  logout(): void {

    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/']);
      localStorage.removeItem('user');
      localStorage.removeItem(this.USER_KYE);
      this.user = undefined;
    }).catch((error) => { alert(error.message) }
    )
    // this.user = undefined;
    // localStorage.removeItem(this.USER_KYE);

    // this.fireauth.signOut().then(() => {
    //   localStorage.removeItem(this.USER_KYE);

    //   this.user = undefined;
    // this.fullName = '';
    // this.gender = '';


    // localStorage.removeItem(this.USER_KYE);


    // localStorage.removeItem('token');
    //     this.router.navigate(['/login'])
    //   }, err => {
    //     alert(err.message)
    //   })

  }

}
