import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birth: ['']
    });
  }

  ngOnInit(): void {

  }

  submitForm() {
    if (this.userForm.valid) {
      let body = {
        "name": this.userForm.get('name')?.value,
        "email": this.userForm.get('email')?.value,
        "password": this.userForm.get('password')?.value,
        "birthAt": this.userForm.get('birth')?.value
      }

      this.usuarioService.registerUser(body).subscribe(r => {
        this.router.navigate(['/add-eventos']);
      })
    }
  }

}
