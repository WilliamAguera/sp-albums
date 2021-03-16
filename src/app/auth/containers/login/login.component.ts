import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSandbox } from '../../auth.sandbox';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    public isLogging$ = this.authSandbox.isLogging$;

    constructor(private authSandbox: AuthSandbox) {
    }

    login() {
        this.authSandbox.login(this.form.value);
    }

    ngOnInit(): void {
    }

}
