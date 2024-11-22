// src/app/components/prato-form/prato-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PratoService, Prato } from '../../services/prato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HomeFormComponent implements OnInit {
  prato: Prato = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    url: ''  // Inicializa a propriedade url
  };
  isEdit: boolean = false;

  constructor(
    private pratoService: PratoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.pratoService.buscarPorId(+id).subscribe((data: Prato) => {
        this.prato = data;
      });
    }
  }

  savePrato() {
    console.log('URL enviada para o banco de dados:', this.prato.url); // Exibe a URL antes de salvar
    this.pratoService.salvar(this.prato).subscribe(() => {
      this.router.navigate(['/']); // Redireciona para a lista de pratos após a criação
    });
  }
}
