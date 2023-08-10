import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';

import { getAuth, updateProfile, 
   createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword } from "firebase/auth";

import { Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';


import { Product } from 'src/app/types/product';
import { ErrorService } from '../core/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService   {

  private user$$ = new BehaviorSubject <User | undefined>(undefined);
  user$ = this.user$$.asObservable();
  user: User | undefined;

  userDataа!: Observable<any>;

  // loggedInUserId: string | null = null;
  private loggedInUserId: string = '';
  USER_KYE = '[user]';

  ownerProducts: Product[] = [];
  likedProducts: Product[] = [];

  get isLogged(): boolean {
    return !!this.user;
  }

  subscription:Subscription;

  // gender: string = '';
  // get isMale(): boolean {
  //   return this.user?.gender === 'male';
  // }

  constructor(

    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService,
  ) {

    this.subscription=this.user$.subscribe((user)=>{
      this.user=user;
    });

    try {
      const lsUser = localStorage.getItem(this.USER_KYE) || '';
      this.user = JSON.parse(lsUser);

    } catch (error) {
      this.user = undefined;
    }

  }


  login(email: string, password: string) {
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
       
        this.loggedInUserId = userCredential.user?.uid || '';
       
        const userData = {
          email: userCredential.user?.email || '',
          id: this.loggedInUserId,
          fullName: userCredential.user?.displayName
        }
       
        this.user = userData;
        localStorage.setItem(this.USER_KYE, JSON.stringify(userData));

        alert(' Successful Login')
        this.router.navigate(['/auth/profile'])


        // this._snackBar.open('Successful Login', 'OK', {
        //   verticalPosition: 'top',
        //   horizontalPosition: 'center',
        //   panelClass: 'bg-success' // Променете 'bg-success' според вашия CSS клас за успешни съобщения
        // });

      }, err => {
        // alert(err.message);
        console.log(err.message)
        this.errorService.setError(err);
        this.router.navigate(['/auth/login'])
      })

  }
  
//Моя вариянт --Promise<void>
  register(fullName: string, email: string, password: string) {
    const auth = getAuth();
 
  return  createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        const user = userCredential.user;
        debugger
        if (user) {
          
          updateProfile(user, {
            displayName: fullName,
            photoURL: ""
          }).then(() => {
           
            this.loggedInUserId = user.uid;

            const userData = {
              email: user.email || '',
              id: this.loggedInUserId,
              fullName: fullName,
            };
      

            localStorage.setItem(this.USER_KYE, JSON.stringify(userData));

            alert('Registration Successful');

            this.router.navigate(['/auth/profile']);
            
          }).catch((error) => {
            // alert(error.message);
            console.log(error.message);
            this.errorService.setError(error);
          });
    
        } else {
          console.log("User is null");
        }
      }).catch((error) => {
        //  alert(error.message);
         this.errorService.setError(error);
        console.log(error.message);
      })
  }

//Observable
//  registerS(fullName: string, email: string, password: string) {
//   const auth = getAuth();
  
//     return from(createUserWithEmailAndPassword(auth, email, password))
//       .pipe(
//         tap((userCredential) => {

//           const user = userCredential.user;
//           if (user) {
//             return updateProfile(user, {
//               displayName: fullName,

//             }).then(() => {

//               this.loggedInUserId = user.uid;

//               const userData = {
//                 email: user.email || '',
//                 id: this.loggedInUserId,
//                 fullName: fullName,
//               };
              
//               this.user$$.next(userData);
//               localStorage.setItem(this.USER_KYE, JSON.stringify(userData));

//               alert('Registration Successful');
//               this.router.navigate(['/auth/profile']);
//               return userData;

//             }).catch((error) => {
//               console.log(error.message);
//               throw error;
//             });
//           } else {
//             console.log("User is null");
//             throw new Error("User is null");
//           }
//         })
//       );
//   }
  
//Моя вариянт
  

  updateUser(fullName:string){
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
  
    updateProfile(user, {
      displayName: fullName,
      
    }).then(() => {
      alert('DisplayName updated!');
      const userData = {
        email:user.email || '',
        id: this.loggedInUserId,
        fullName: fullName,
      };
      this.user = userData;
    this.user$$.next(this.user);
  
    }).catch((error) => {
      // alert('An error occurred')
      this.errorService.setError(error);
    });

  }
}

  logout(): void {

    const auth = getAuth();
    signOut(auth).then(() => {
 
      localStorage.removeItem('user');
      localStorage.removeItem(this.USER_KYE);
      this.user = undefined;
      this.router.navigate(['/']);
    }).catch((error) => { 
      // alert(error.message) 
      this.errorService.setError(error);
    }
    )
    this.user = undefined;
   
  }

  //Observable
  // logout(): void {

  //   const auth = getAuth();
  //   signOut(auth).then(() => {
 
  //     localStorage.removeItem('user');
  //     localStorage.removeItem(this.USER_KYE);
  //     this.user = undefined;
  //     this.router.navigate(['/']);
  //   }).catch((error) => { alert(error.message) }
  //   ).pipe(tap(()=>this.user$$.next(undefined)))
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  //   };
}


// async getUserById(userId: string): Promise<User | null> {
//   const docRef = doc(collection(this.firestore, 'users'), userId);
//   const docSnap = await getDoc(docRef);
// debugger
//   if (docSnap.exists()) {
//     const userData = docSnap.data();
//     return {
//       email: userData['email'],
//       id: userId,
//       fullName: userData['displayName'] || '',
//       // Add other properties as needed
      
//     };
//   } else {
//     console.log("User not found!");
//     return null;
//   }
// }


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

   // localStorage.setItem(this.USER_KYE, JSON.stringify(this.user));
    // return this.http.post('/api/login', { email, password });