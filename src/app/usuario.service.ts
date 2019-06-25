import { Injectable } from '@angular/core';
import {Observable, observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './models/usuario';
import {isNumber} from 'util';
import {tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL = 'assets/usuarios.json';
  generosList = null;
  usuariosVet = this.vetor();

  constructor(protected http: HttpClient) { }

  lista(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL);
  }

  encontrar(usuario): Observable<Usuario> {
    return this.lista().pipe(
      map((usuarios: Usuario[]) => {
        if (isNumber(usuario)) {
          return usuarios.find(u => u.id === usuario);
        } else {
          return usuarios.find(u => u.nome === usuario);
        }
      })
    );
  }

  generos() {
    return this.lista()
      .pipe(
        map(usuarios => {
          let generos = [];
          for (let usuario of usuarios) {
            for (let favorito of usuario.favoritos) {
              if (generos.indexOf(favorito) === -1) {
                generos.push(favorito);
              }
            }
          }
          return generos;
        })
      );
  }

  vetor() {
    let Vet = [];
    this.generosList = this.generos();
    let usuarios = this.lista();
    for (let usuario of usuarios) {
      let vetor = [];
      for (let genero of this.generosList) {
        let vai = 0;
        for (let favorito of usuario.favoritos) {
          if (genero === favorito) {
            vetor.push(1);
            vai = 1;
          }
        }
        if (vai === 0) {
          vetor.push(0);
        }
      }
      Vet.push({
        id: usuario.id,
        nome: usuario.nome,
        lista: vetor,
      });
    }
    return Vet;
  }

  matriz() {
    let matriz = [];
    for (let usuario of this.usuariosVet) {
      let valor = 0;
      for (let usuario2 of this.usuariosVet) {
        if (usuario.nome !== usuario2.nome) {
          let soma = 0;
          for (let x of usuario.lista.length) {
            soma = soma + (usuario.lista[x] - usuario2.lista[x]);
            soma = soma * soma;
          }
          let raiz = Math.sqrt(soma);
          if (raiz > valor) {
            valor = raiz;
            usuario.match = usuario2.nome;
            matriz.push(usuario);
          }
        }
      }
      return matriz;
    }
  }

}
