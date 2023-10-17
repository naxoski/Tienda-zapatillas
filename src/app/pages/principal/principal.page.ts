import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  @ViewChild('resultado', { static: false }) resultadoElement!: ElementRef;

  constructor() { }

  ngOnInit() {
    // No necesitas inicializar resultadoElement aquí si no lo vas a usar en ngOnInit
  }

  ionViewDidEnter() {
    // Obtén el valor del localStorage
    const idUsuario = localStorage.getItem('idusuario');
    
    // Verifica si el valor de idUsuario no es nulo y actualiza el contenido de la etiqueta usando ViewChild
    if (idUsuario !== null && this.resultadoElement) {
      this.resultadoElement.nativeElement.textContent = 'ID de Usuario: ' + idUsuario;
    } else if (this.resultadoElement) {
      this.resultadoElement.nativeElement.textContent = 'No se encontró ningún ID de usuario en el localStorage.';
    }
  }
}

