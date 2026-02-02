import { Component, inject, signal } from '@angular/core';
import { Supaservice } from '../../services/supaservice';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';

const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('password2');
  return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordValidator: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  supaservice: Supaservice = inject(Supaservice);
  formulario: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  logguedData= signal<any>('');
  errorMessage= signal<any>('');

  constructor() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validators: passwordValidator
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
  
  passwordNotValid(name: string){
    return (
      (this.formulario.controls[name].invalid || this.formulario
      .hasError('passwordValidator')) &&
      this.formulario.controls[name].touched
    );
  }

  passwordValid(name: string){
    return (
      (this.formulario.controls[name].valid || !this.formulario
      .hasError('passwordValidator')) &&
      this.formulario.controls[name]!.touched
    );
  }
  
  get passwordCrossValidation(){
    if (this.formulario.hasError('passwordValidator') 
      && this.formulario.get('password')?.touched
      && this.formulario.get('password2')?.touched) {
      return true;
    } else {
      return false;
    }
  }

  register(){
    const loginData = this.formulario.value;
    this.supaservice
      .register(loginData)
      .then((data) => {
        this.logguedData.set(data);
        this.errorMessage.set('');
    }).catch((error:Error) => {
      this.errorMessage.set(error.message);
    })
  }
}
