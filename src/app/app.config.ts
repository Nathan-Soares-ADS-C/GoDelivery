import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PratoListComponent } from './components/prato-list/prato-list.component';
import { PratoFormComponent } from './components/prato-form/prato-form.component';
import { CardapioListComponent } from './components/cardapio-list/cardapio-list.component';
import { CarrinhoListComponent } from './components/carrinho-list/carrinho-list.component';
import { HomeFormComponent } from './components/home-form/home';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { CozinhaListFormComponent } from './components/cozinha-form-list/cozinha-form-list.component';
import { EntregadorListComponent } from './components/entregador-list/entregador-list.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { PixPaymentComponent } from './components/pix-payment/pix-payment.component';


const routes: Routes = [
  { path: 'List-prato', component: PratoListComponent },
  { path: 'add-prato', component: PratoFormComponent },
  { path: 'cardapio', component: CardapioListComponent },
  { path: 'carrinho', component: CarrinhoListComponent },
  { path: 'cozinha', component: CozinhaListFormComponent },
  { path: 'pedido', component: PedidoListComponent },
  { path: 'entregador', component: EntregadorListComponent },
  { path: 'credito', component: CreditCardComponent },
  { path: 'pix', component: PixPaymentComponent },
  { path: '', component: HomeFormComponent },

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
};
