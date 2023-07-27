import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { FormsModule } from '@angular/forms';
import { appInterceptorProvider } from './app.interceptor';

import { environment } from '../environments/environment';

// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,

    MainComponent,
    NotFoundComponent,

    HomeComponent,
    ProductListComponent,

  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    FormsModule,

    CoreModule,
    UserModule,
    ProductModule,

    AngularFireModule.initializeApp(environment.firebase),
  
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(()=>getFirestore()),
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
