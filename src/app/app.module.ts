import { PipesModule } from './pipes/pipes.module';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { toastAnimation } from './toastAnimation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from "angularfire2";
import { environment } from './../environments/environment.prod';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(
      {toastEnter: toastAnimation}
    ),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuardService, // Servicio de autenticacion
    NativeStorage, // Servicio de almacenamiento: nativo
    GooglePlus, // Servicio de login de Google
    QRScanner, // Servicio de scanner de QR: nativo
    NativeAudio, // Servicio de sonido: nativo
    Camera, // Servicio de camara: nativo,
    SidemenuComponent, // Componente menu lateral
    StreamingMedia, // Servicio de video en streaming
    SpeechRecognition, // Servicio de reconocimiento de voz: nativo
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
