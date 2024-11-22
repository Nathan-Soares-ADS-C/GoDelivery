// src/app/components/prato-list/prato-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PratoService, Prato } from '../../services/prato.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prato-list',
  templateUrl: './prato-list.component.html',
  styleUrls: ['./prato-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PratoListComponent implements OnInit {
  pratos: Prato[] = [];

  constructor(private pratoService: PratoService) {}

  ngOnInit(): void {
    this.loadPratos();
  }

  loadPratos() {
    this.pratoService.listarTodos().subscribe((data: Prato[]) => {
      this.pratos = data;
    });
  }

  deletePrato(id: number) {
    this.pratoService.deletarPorId(id).subscribe(() => {
      this.loadPratos();
    });
  }
}
