import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prato-list',
  templateUrl: './cozinha-form-list.component.html',
  styleUrls: ['./cozinha-form-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CozinhaListFormComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPratos();
  }
  get pedidosFiltrados() {
    return this.pedidos.filter(pedido =>
      pedido.status === 'Pagamento aprovado'
    );
  }

  loadPratos() {
    this.pedidoService.listarTodos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    });
  }

  deletePrato(id: number) {
    this.pedidoService.deletarPorId(id).subscribe(() => {
      this.loadPratos();
    });
  }

  toggleLanches(pedido: any): void {
    pedido.showLanches = !pedido.showLanches;
  }

  atualizarStatus(pedido: any, novoStatus: string): void {
    this.pedidoService.atualizarStatus(pedido.id, novoStatus).subscribe(
      (response) => {
        pedido.status = novoStatus;
        console.log('Status atualizado com sucesso', response);
      },
      (error) => {
        console.error('Erro ao atualizar o status:', error);
      }
    );
  }
}
