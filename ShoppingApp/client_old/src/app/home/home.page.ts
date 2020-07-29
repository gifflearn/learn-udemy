import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../models/environments';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nom: string;
  description: string;

  constructor(private http: HttpClient) {
    this.loadArticles();
  }

  loadArticles(): void {
    const url = `${environment.api_url}/Articles`;
    console.log('url : ', url );
    this.http.get(url)
      .subscribe(articles => console.log('articles ', articles));
  }

  insertArticle(): void {
    const url = `${environment.api_url}/Articles`;
    console.log('url : ', url );
    this.http.post(url, { nom: this.nom, description: this.description})
      .subscribe(results => console.log('results', results));
  }

  updateArticle(): void {
    const id = '5f19a086b37a312510a4802a';
    const url = `${environment.api_url}/Articles/${id}`;
    console.log('url : ', url );
    this.http.patch(url, { nom: 'Iphone (Updated)' })
      .subscribe(results => console.log('results', results));
  }

  removeArticle(): void {
    const id = '5f19a086b37a312510a4802a';
    const url = `${environment.api_url}/Articles/${id}`;
    console.log('url : ', url );
    this.http.delete(url)
      .subscribe(results => console.log('results', results));
  }
}
