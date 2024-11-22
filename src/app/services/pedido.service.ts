import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;
  valorTotal: number;
  status: string;
  lanches: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('http://localhost:8080/pedidos');
  }

  buscarPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  salvar(prato: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, prato);
  }

  deletarPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarStatus(id: number, novoStatus: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.put(url, novoStatus);
  }
}
