import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UsuarioService} from '../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario = null;
  matchU = this.match();
  constructor(private route: ActivatedRoute, private usuario$: UsuarioService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.usuario$.encontrar(parseInt(id))
        .subscribe(usuario => this.usuario = usuario);
      });
  }

  match() {
    let lista = this.usuario$.matriz();
    for (let m of lista) {
      if (m.nome === this.usuario.nome) {
        this.matchU = m.match;
      }
    }
  }

}
