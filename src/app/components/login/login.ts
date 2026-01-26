import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formulario: FormGroup;

  formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get emailNotValid(){
    return this.formulario.get('email')!.invalid &&
            this.formulario.get('email')!.touched;
  }

  get emailValidation(){
    if (this.formulario.get('email')!.invalid && 
        this.formulario.get('email')!.touched) {
      return 'is-invalid';
    }

    if (this.formulario.get('email')!.valid && 
        this.formulario.get('email')!.touched) {
      return 'is-valid';
    }
    return '';
  }

  get passwordValidation(){
    if (this.formulario.get('password')!.invalid && 
        this.formulario.get('password')!.touched) {
      return 'is-invalid';
    }

    if (this.formulario.get('password')!.valid && 
        this.formulario.get('password')!.touched) {
      return 'is-valid';
    }
    return '';
  }
}
