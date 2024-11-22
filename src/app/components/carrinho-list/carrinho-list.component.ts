import { Component, OnInit } from '@angular/core';
import { CarrinhoService, Item } from '../../services/carrinho.service';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho-list.component.html',
  styleUrls: ['./carrinho-list.component.css']
})
export class CarrinhoListComponent implements OnInit {
  itens: Item[] = [];
  total: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCarrinho();
  }

  listarCarrinho() {
    this.carrinhoService.getAllCarrinho().subscribe((data: Item[]) => {
      this.itens = data;
      this.calculateTotal();
    }, (error) => {
      console.error('Erro ao carregar itens do carrinho:', error);
    });
  }

  calculateTotal(): void {
    this.total = this.itens.reduce((sum, item) => {
      return sum + (item.quantidade * item.prato.price);
    }, 0);
  }

  alterarQuantidade(item: Item, quantidadeAlterada: number): void {
    const novaQuantidade = item.quantidade + quantidadeAlterada;

    if (novaQuantidade < 1) {
      return;
    }

    this.atualizarQuantidade(item.idItem, novaQuantidade);
  }

  atualizarQuantidade(idItem: number, quantidade: number): void {
    this.carrinhoService.atualizarQuantidade(idItem, quantidade).subscribe((itemAtualizado: Item) => {
      const index = this.itens.findIndex(item => item.idItem === idItem);
      if (index !== -1) {
        this.itens[index].quantidade = itemAtualizado.quantidade;
        this.calculateTotal();
      }
    }, (error) => {
      console.error('Erro ao atualizar quantidade do item:', error);
    });
  }

  saveCarrinho(): void {
    const itensPedido = this.itens.map(item => `${item.prato.name} - ${item.quantidade}`).join(', ');

    const novoPedido: Pedido = {
    id: 0,
    valorTotal:  this.total,
    status: 'Aguardando pagamento',
    lanches: itensPedido
    };

    this.pedidoService.salvar(novoPedido).subscribe(() => {
      this.clearCarrinho().then(() => {
        this.router.navigate(['/pedidos']);
      }).catch(err => {
        console.error('Erro ao limpar o carrinho:', err);
      });
    });
  }

  deleteItem(idItem: number): void {
    this.carrinhoService.deleteCarrinho(idItem).subscribe(() => {
      this.itens = this.itens.filter(item => item.idItem !== idItem);
      this.calculateTotal();
    }, (error) => {
      console.error('Erro ao deletar item do carrinho:', error);
    });
  }

  clearCarrinho(): Promise<void> {
    const deletePromises = this.itens.map(item =>
      this.carrinhoService.deleteCarrinho(item.idItem).toPromise()
    );

    return Promise.all(deletePromises).then(() => {
      this.itens = [];
      this.total = 0;
    });
  }
}
