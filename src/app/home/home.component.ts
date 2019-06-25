import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../usuario.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios = null;

  constructor(private usuario: UsuarioService) { }

  ngOnInit() {
    this.usuario.lista()
      .pipe(
        map(usuarios => usuarios.slice(0, 99))
      )
      .subscribe(usuarios => this.usuarios = usuarios);
  }

}
