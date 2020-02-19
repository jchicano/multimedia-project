import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.page.html',
  styleUrls: ['./edit-note-modal.page.scss'],
})
export class EditNoteModalPage implements OnInit {

  @Input() id;
  @Input() title;
  @Input() description;
  @Input() image;

  public myForm: FormGroup;
  public capturedSnapURL: string;
  public cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
    this.myForm.get('title').setValue(this.title);
    this.myForm.get('description').setValue(this.description);
    this.capturedSnapURL = this.image;
  }

  public submit() {
    console.log(this.myForm.value);
    //this.modalController.dismiss(this.myForm.value,...this.capturedSnapURL);
    this.modalController.dismiss({
      id: this.id,
      title: this.myForm.get('title').value,
      description: this.myForm.get('description').value,
      image: this.capturedSnapURL
    });
  }

  cancelar() {
    this.modalController.dismiss();
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

}
