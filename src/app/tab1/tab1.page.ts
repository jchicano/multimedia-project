import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';
import { Platform } from '@ionic/angular';
import { NoteService } from './../services/note.service';
import { LoadingService } from './../services/ui/loading.service';
import { note } from './../model/Note';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  videoOptions: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: false
  };
  public capturedSnapURL: string;
  public todoForm: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private loadingS: LoadingService,
    private toastS: ToastService,
    private noteS: NoteService,
    private camera: Camera,
    private platform: Platform,
    private streamingMedia: StreamingMedia
  ) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  public logout() {
    this.auth.logout();
  }

  addNote(): void {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value,
      image: this.capturedSnapURL
    };

    this.loadingS.show('Guardando...');

    this.noteS.addNote(data)
      .then((ok) => {
        this.toastS.showOnceToast('Nota guardada');
        this.todoForm.reset();
      })
      .catch((err) => {
        this.toastS.showOnceToast('Error al guardar nota');
      })
      .finally(() => {
        this.loadingS.close();
      });
  }

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
      console.log(this.capturedSnapURL);
    }, (err) => {

      console.log(err);
      // Handle error
    });
  }
  generateImage(
    img: string,
    quality: number = 1,
    MAX_WIDTH: number,
    MAX_HEIGHT: number
  ) {
    return new Promise((resolve, reject) => {
      const canvas: any = document.createElement('canvas');
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = img;
      image.onload = () => {
        let width = image.width;
        let height = image.height;
        if (!MAX_HEIGHT) {
          MAX_HEIGHT = image.height;
        }
        if (!MAX_WIDTH) {
          MAX_WIDTH = image.width;
        }
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas
          .toDataURL('image/jpeg', quality)
          .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        resolve(dataUrl);
      };
      image.onerror = e => {
        reject(e);
      };
    });
  }

  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    this.streamingMedia.playVideo('http://techslides.com/demos/sample-videos/small.mp4', options);
  }

  startAudio() {
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      initFullscreen: false,
    };
    this.streamingMedia.playAudio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3', options);
  }

  stopAudio() {
    this.streamingMedia.stopAudio();
  }

}
