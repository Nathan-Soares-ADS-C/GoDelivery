import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  idItem: number;
  prato: {
    id: number;
    name: string;
    description: string;
    price: number;
    url: string;
  };
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:8080/carrinho';

  constructor(private http: HttpClient) {}

  getAllCarrinho(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  adicionarPrato(pratoId: number, quantidade: number): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/adicionar?pratoId=${pratoId}&quantidade=${quantidade}`, {});
  }

  atualizarQuantidade(idItem: number, quantidade: number): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/atualizar-quantidade/${idItem}?quantidade=${quantidade}`, {});
  }

  deleteCarrinho(idItem: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${idItem}`);
  }
}
