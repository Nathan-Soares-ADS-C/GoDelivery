import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prato-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos() {
    this.pedidoService.listarTodos().subscribe((data: Pedido[]) => {
      this.pedidos = data;

      this.pedidos.sort((a, b) => b.id - a.id);
    });
  }

  deletePedido(id: number) {
    this.pedidoService.deletarPorId(id).subscribe(() => {
      this.loadPedidos();
    });
  }

  toggleLanches(pedido: any): void {
    pedido.showLanches = !pedido.showLanches;
  }
}
