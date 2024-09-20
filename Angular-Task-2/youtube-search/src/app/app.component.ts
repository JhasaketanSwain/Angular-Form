import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  searchForm: FormGroup;
  results: any[] = [];
  // private apiUrl = 'https://jsonplaceholder.typicode.com/photos'; 
     private apiUrl = 'https://www.googleapis.com/youtube/v3/search';


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required]]
    });
  }

  onSearch() {
    const query = this.searchForm.get('query')?.value;
    if (query) {
      this.http.get(this.apiUrl).subscribe((response: any) => {
        
        this.results = response.slice(0, 10); 
      });
    }
  }
  
}
