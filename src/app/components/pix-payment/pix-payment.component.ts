import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prato-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pix-payment.component.html',
  styleUrls: ['./pix-payment.component.css']
})
export class PixPaymentComponent {
  pedidos: Pedido[] = [];
  ultimoPedido!: Pedido;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPratos();
  }

  loadPratos() {
    this.pedidoService.listarTodos().subscribe((data: Pedido[]) => {
      if (data && data.length > 0) {
        const ultimoPedido = data.reduce((max, current) =>
          current.id > max.id ? current : max
        ); // Encontra o pedido com o maior ID
        this.ultimoPedido = ultimoPedido; // Armazena o último pedido
        this.pedidos = [ultimoPedido]; // Opcional: Armazena como array, caso necessário
      }
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
