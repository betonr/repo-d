import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.sass']
})
export class ImageContainerComponent {

  @Input() title: string; 

  @Input() imageName: string; 
  
  constructor(private router: Router) {}

  goToImg() {
    this.router.navigate(["image", { name: this.imageName }]);
  }

}
