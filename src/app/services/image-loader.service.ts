import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  private IMG_DIRECTORY = 'img';


  constructor( private storage: AngularFireStorage ) { }

  uploadImageFirebase( image: File) : string {

    const filePath : string = `${ this.IMG_DIRECTORY }/${ image['name'] }`;

    const ref = this.storage.ref(filePath);

    const task = ref.put(image);

    task.snapshotChanges()
    .pipe(
      finalize(
      () => {
        console.log("Loaded");
      }
      )
    )
    .subscribe();

    return filePath;

  }

}
