import { Component, OnInit } from '@angular/core';
import { AuthSandbox } from '../auth/auth.sandbox';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userLogged$ = this.authSandbox.userLogged$;

  constructor( private authSandbox: AuthSandbox ) { }

  ngOnInit(): void {
  }

  logoff() {
    this.authSandbox.logoff();
  }

}
