import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-usocamara',
  templateUrl: './usocamara.page.html',
  styleUrls: ['./usocamara.page.scss'],
})
export class UsocamaraPage implements OnInit {

  image: any;

  constructor() { }

  ngOnInit() {
  }

  takePicture() {
    const image2 = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      //var imageUrl = image.webPath;
      this.image = image2.DataUrl;
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
    };
  }

}


