import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: any[] = [];
  newItem = { name: '', quantity: 0, description: '' };
  errorMessage = '';

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventoryService.getItems().subscribe({
      next: data => this.items = data,
      error: err => this.errorMessage = 'Failed to load inventory items'
    });
  }

  addItem() {
    if (!this.newItem.name || this.newItem.quantity <= 0) {
      this.errorMessage = 'Please enter valid item name and quantity';
      return;
    }
    this.inventoryService.addItem(this.newItem).subscribe({
      next: item => {
        this.items.push(item);
        this.newItem = { name: '', quantity: 0, description: '' };
        this.errorMessage = '';
      },
      error: err => this.errorMessage = 'Failed to add item'
    });
  }

  deleteItem(id: string) {
    this.inventoryService.deleteItem(id).subscribe({
      next: () => this.items = this.items.filter(i => i._id !== id),
      error: err => this.errorMessage = 'Failed to delete item'
    });
  }
}
