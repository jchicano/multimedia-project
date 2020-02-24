import { ChangeDetectorRef } from "@angular/core";
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  matches: string[];
  isRecording: boolean = false;

  constructor(
    private platform: Platform,
    private speechRecognition: SpeechRecognition,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  isIos() {
    return this.platform.is('ios');
  }

  getPermissions() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      })
  }

  startListening() {
    let options = {
      language: 'es-ES'
    };
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => {
          this.matches = matches;
          this.changeDetectorRef.detectChanges();
        },
        (onerror) => console.log('error:', onerror)
      )
    this.isRecording = true;
  }

  stopListening() {
    this.speechRecognition.stopListening()
      .then(() => {
        this.isRecording;
      })
  }

}
