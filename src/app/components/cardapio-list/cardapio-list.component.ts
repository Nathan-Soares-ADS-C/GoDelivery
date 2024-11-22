import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PratoService, Prato } from '../../services/prato.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './cardapio-list.component.html',
  styleUrls: ['./cardapio-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CardapioListComponent implements OnInit {

  pratos: Prato[] = [];
  quantidade: number = 1;

  constructor(
    private pratoService: PratoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.loadPratos();
  }

  loadPratos() {
    this.pratoService.listarTodos().subscribe((data: Prato[]) => {
      this.pratos = data;
    });
  }

  adicionarAoCarrinho(pratoId: number) {
    this.carrinhoService.adicionarPrato(pratoId, this.quantidade).subscribe(
      (item) => {
        console.log('Prato adicionado ao carrinho', item);
      },
      (error) => {
        console.error('Erro ao adicionar prato ao carrinho', error);
      }
    );
  }

  deletePrato(id: number) {
    this.pratoService.deletarPorId(id).subscribe(() => {
      this.loadPratos();
    });
  }
}
