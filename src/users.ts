/// <reference path="../jspm_packages/github/aurelia/framework@0.17.0/aurelia-framework.d.ts"/>
/// <reference path="../jspm_packages/github/aurelia/fetch-client@0.3.0/aurelia-fetch-client.d.ts"/>

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
  }

  async activate() {
    let response = await this.http.fetch('users');
    let users = await response.json();
    this.users = users;
  }
}
