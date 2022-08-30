import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cidades } from 'src/app/models/cidades';
import { Estados } from 'src/app/models/estados';
import { Pontos } from 'src/app/models/pontos';
import { IbgeService } from 'src/app/services/ibge.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  public formCadastro: FormGroup;

  public estados: Estados[] = [];
  public cidades: Cidades[] = [];

  pontosCadastrados: Pontos[] = [];

  private service: IbgeService;

  constructor(public formBuilder: FormBuilder, service: IbgeService) {
    this.service = service;
    this.formCadastro = formBuilder.group({
      nome: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      pontoDeVenda: ["", [Validators.required]],
      start: ["", [Validators.required]],
      end: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.initializeEstado();
  }

  public create(): void {
    if (this.formCadastro.valid) {
      console.log(this.formCadastro);
      this.pontosCadastrados.push(this.formCadastro.value)
      console.log(this.pontosCadastrados);
    }
  }

  public initializeEstado(): void {
    this.service.findEstado().subscribe(estados => {
      this.estados = estados;
    })
  }

  public initializeCidade(id: number): void {
    this.service.findCidade(this.formCadastro.value.estado.id).subscribe(cidades => {
      this.cidades = cidades;
    })
  }

  ngAfterViewChecked(): void {
    this.initializeCidade(this.formCadastro.value.estado.id);
  }

}
