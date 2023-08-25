import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  usuarioR: string = "";
  claveR: string = "";
  constructor( private router: Router, private activeRoute: ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.claveR = this.router.getCurrentNavigation()?.extras?.state?.['claveEnviada'];
        this.usuarioR = this.router.getCurrentNavigation()?.extras?.state?.['userEnviado'];
      }
    })
  }

  ngOnInit() {
  }

}
