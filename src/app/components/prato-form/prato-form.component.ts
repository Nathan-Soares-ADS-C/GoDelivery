import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PratoService, Prato } from '../../services/prato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prato-form',
  templateUrl: './prato-form.component.html',
  styleUrls: ['./prato-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PratoFormComponent implements OnInit {
  prato: Prato = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    url: ''
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
    console.log('URL enviada para o banco de dados:', this.prato.url);
    this.pratoService.salvar(this.prato).subscribe(() => {
      this.router.navigate(['/List-prato']);
    });
  }
}
