import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  formLogin: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
        Validators.required
      ])],
      pass: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  login() {
    if (this.formLogin.get('email')?.valid && this.formLogin.get('pass')?.valid) {
      this.loading = true;
      this.sendRequest();
    }
    else {
      this.error = true;
    }
  }

  sendRequest() {
    this.authService.login(this.formLogin.get('email')?.value, this.formLogin.get('pass')?.value).subscribe((r: any) => {
      this.loading = false;
      console.log(r);
      let user = r.objUser;
      sessionStorage.setItem('id_user', user.user.id_user);
      let res = this.authService.saveSession(user);
      if (res) {
        this.router.navigate(['/listar-eventos']);
      }
    })
  }

  registerUser() {
    this.router.navigate(['/cadastro-usuario']);
  }
}

