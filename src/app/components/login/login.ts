import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  supaservice: Supaservice = inject(Supaservice);
  formulario: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  logguedData= signal<any>('');
  errorMessage= signal<any>('');

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

  login(){
    const loginData = this.formulario.value;
    this.supaservice
      .login(loginData)
      .then((data) => {
        this.logguedData.set(data);
        this.errorMessage.set('');
    }).catch((error:Error) => {
      this.errorMessage.set(error.message);
    })
  }
}
