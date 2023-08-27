import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
