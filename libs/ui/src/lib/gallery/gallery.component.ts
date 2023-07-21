import { Component, OnInit ,Input} from '@angular/core';

@Component({
    selector: 'ui-gallery-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit{
    selectedImage :string ;
    @Input() images:string[];

   
    ngOnInit(): void {
      if(this.images.length){
        this.selectedImage = this.images[0];
      }
    }

    onImageChange(image :string){
   this.selectedImage = image;
    }

    get hasImage(){
        return this.images?.length>0 ;
    }
   
}
