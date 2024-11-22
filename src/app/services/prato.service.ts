import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prato {
  id: number;
  name: string;
  description: string;
  price: number;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PratoService {
  private apiUrl = 'http://localhost:8080/pratos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Prato[]> {
    return this.http.get<Prato[]>('http://localhost:8080/pratos');
  }

  buscarPorId(id: number): Observable<Prato> {
    return this.http.get<Prato>(`${this.apiUrl}/${id}`);
  }

  salvar(prato: Prato): Observable<Prato> {
    return this.http.post<Prato>(this.apiUrl, prato);
  }

  deletarPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
