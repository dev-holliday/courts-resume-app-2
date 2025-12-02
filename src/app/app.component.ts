import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, HelloResponse, Item } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Web Resume Application';
  helloData: HelloResponse | null = null;

  items: Item[] = [];
  newItemName = '';
  isLoadingItems = false;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadHello();
    this.loadItems();
  }

  loadHello(): void {
    this.api.getHello().subscribe({
      next: (res) => (this.helloData = res,
        console.log('API response:', res)
      ),
      error: (err) => {
        console.error('Error calling /api/hello/', err);
        this.helloData = null;
      },
    });
  }

  loadItems(): void {
    this.isLoadingItems = true;
    this.errorMessage = '';

    this.api.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoadingItems = false;
      },
      error: (err) => {
        console.error('Error loading items', err);
        this.errorMessage = 'Failed to load items from backend.';
        this.isLoadingItems = false;
      },
    });
  }

  addItem(): void {
    const trimmed = this.newItemName.trim();
    if (!trimmed) return;

    this.errorMessage = '';
    this.api.createItem(trimmed).subscribe({
      next: (item) => {
        this.items.push(item);
        this.newItemName = '';
      },
      error: (err) => {
        console.error('Error creating item', err);
        this.errorMessage = 'Failed to create item.';
      },
    });
  }
}
