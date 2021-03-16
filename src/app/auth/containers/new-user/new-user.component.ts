import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSandbox } from '../../auth.sandbox';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    public form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    constructor(private authSandbox: AuthSandbox) {
    }

    ngOnInit(): void {
    }

    createUser() {
        this.authSandbox.createUser({
            name: this.form.get('name')?.value,
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value
        });
    }


}
