import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prato-list',
  templateUrl: './entregador-list.component.html',
  styleUrls: ['./entregador-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EntregadorListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPratos();
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

  get pedidosFiltrados() {
    return this.pedidos.filter(pedido =>
      pedido.status === 'Concluído' || pedido.status === 'Rota de Entrega'
    );
  }

  atualizarStatus(pedido: any, novoStatus: string): void {
    if (pedido.status === 'Rota de Entrega') {
      novoStatus = 'Entregue';
    } else if (pedido.status === 'Concluído') {
      novoStatus = 'Rota de Entrega';
    }
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
