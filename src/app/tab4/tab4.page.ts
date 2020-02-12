import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private qrScanner: QRScanner,
    private nativeAudio: NativeAudio
  ) { }

  ngOnInit() {
    this.preloadAudio();
  }

  scanQR() { //TODO
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  preloadAudio() {
    this.nativeAudio.preloadSimple('playToasty', 'assets/sounds/toasty.mp3').then((success) => { }, (error) => {
      console.log(error);
    });
  }

  playToasty() {
    this.nativeAudio.play('playToasty').then((success) => {
      console.log("Reproduciendo sonido Toasty...");
    }, (error) => {
      console.log(error);
    });
  }

}
