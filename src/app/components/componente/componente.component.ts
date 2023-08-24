import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ComponenteComponent  implements OnInit {
  @Input() nombre : string =""; 
  constructor() { }

  ngOnInit() {}

}
