import { Component, ElementRef, ViewChild } from '@angular/core';
import { InventoryService } from '../../../_services/inventory/inventory.service';
import { CompanyService } from '../../../_services/company/company.service';
import { Company } from '../../../models/company';
import { Inventory } from '../../../models/inventory';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  @ViewChild('editInventoryModal') editInventoryModalRef!: ElementRef;
  @ViewChild('addInventoryModal') addInventoryModalRef!: ElementRef;

  companyDetails: Company | null = null;
  inventories: Inventory[] = [];
  selectedInventory: Inventory | null = null;
  newInventory: Inventory = { id: 0, productName: '', description: '', qtyInStock: 0 , price: 0 };
  errorMessage: string = '';
  filteredInventories: Inventory[] = [];
  searchTerm: string = '';
  showOutOfStock: boolean = false;
  companyId: number = 0;
  private editModalInstance: Modal | null = null;
  private addModalInstance: Modal | null = null;

  constructor(private companyService: CompanyService, private inventoryService: InventoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const companyId = Number(this.route.snapshot.paramMap.get('companyId'));
    if (companyId) {
      this.companyId = companyId;
      this.fetchInventoriesByCompanyId(companyId);
    } else {
      this.fetchInventories();
    }
  }

  private fetchInventoriesByCompanyId(companyId: number): void {
    this.inventoryService.getInventory(companyId).subscribe({
      next: (data) => {
        this.inventories = data;
        this.filteredInventories = [...this.inventories]; // initialize filtered list
      },
      error: (error) => {
        console.error('Error fetching inventory list', error);
        this.errorMessage = 'Failed to load inventory details. Please try again.';
      },
    });
  
    this.companyService.getCompanyDetails(companyId).subscribe({
      next: (company) => {
        this.companyDetails = company;
      },
      error: (error) => {
        console.error('Error fetching company details', error);
        this.errorMessage = 'Failed to load company details. Please try again.';
      },
    });
  }
  
  private fetchInventories(): void {
    this.companyService.getUserCompanyId().subscribe({
      next: (companyId) => {
        this.companyId = companyId;
        this.fetchInventoriesByCompanyId(companyId);
      },
      error: (error) => {
        console.error('Error fetching company ID', error);
        this.errorMessage = 'Could not retrieve company or inventory information. Please try again.';
      },
    });
  }  

  onEditInventory(inventory: Inventory): void {
    this.selectedInventory = { ...inventory }; // Clone the selected inventory data
    if (this.editInventoryModalRef) {
      this.editModalInstance = new Modal(this.editInventoryModalRef.nativeElement, {});
      this.editModalInstance.show();
    }
  }

  closeEditModal(): void {
    this.editModalInstance?.hide();
    this.editModalInstance = null;
    this.selectedInventory = null;
  }

  openAddInventoryModal(): void {
    if (this.addInventoryModalRef) {
      this.addModalInstance = new Modal(this.addInventoryModalRef.nativeElement, {});
      this.addModalInstance.show();
    }
  }

  closeAddModal(): void {
    this.addModalInstance?.hide();
    this.addModalInstance = null;
  }

  onUpdateInventory(productName: string, description: string, qtyInStock: any, price: any): void {
    if (!this.selectedInventory) return;
    this.selectedInventory = { ...this.selectedInventory, productName, description, qtyInStock, price};
  
    this.inventoryService.updateInventory(this.selectedInventory.id, this.selectedInventory).subscribe({
      next: (updatedInventory) => {
        const index = this.inventories.findIndex(emp => emp.id === updatedInventory.id);
        if (index > -1) this.inventories[index] = updatedInventory;
        this.filteredInventories = [...this.inventories];  // Update filtered list
        this.closeEditModal();
        this.selectedInventory = null;
      },
      error: (error) => {
        console.error('Error updating inventory', error);
        this.errorMessage = 'Failed to update inventory. Please try again.';
      }
    });
  }

  onAddInventory(): void {
    if (this.companyDetails?.id) {
      this.inventoryService.addInventory(this.companyDetails.id, this.newInventory).subscribe({
        next: (addedInventory) => {
          this.inventories.push(addedInventory);
          this.filteredInventories = [...this.inventories];  // Update filtered list
          this.newInventory = { id: 0, productName: '', description: '', qtyInStock: 0, price: 0 };  // Reset form
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error adding inventory', error);
          this.errorMessage = 'Failed to add inventory. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Company ID is missing. Cannot add inventory.';
    }
  }

  onDeleteInventory(inventoryId: number): void {
    if (confirm('Are you sure you want to delete this inventory?')) {
      this.inventoryService.deleteInventory(inventoryId).subscribe({
        next: () => {
          this.inventories = this.inventories.filter(emp => emp.id !== inventoryId);
          this.filteredInventories = [...this.inventories];  // Update filtered list
        },
        error: (error) => {
          console.error('Error deleting inventory', error);
          this.errorMessage = 'Failed to delete inventory. Please try again.';
        }
      });
    }
  }

  onSearchInventory(): void {
    if (this.searchTerm.trim()) {
      this.companyService.getUserCompanyId().subscribe(companyId => {
        this.inventoryService.searchInventoryByProductName(companyId, this.searchTerm).subscribe({
          next: (data) => {
            this.filteredInventories = data;
          },
          error: (error) => {
            console.error('Error searching inventory by product name', error);
            this.errorMessage = 'Failed to search inventory. Please try again.';
          },
        });
      });
    } else {
      this.fetchInventoriesByCompanyId(this.companyId); // Reset to original inventory list if search term is empty
    }
  }

  onToggleOutOfStock(): void {
    if (this.showOutOfStock) {
      this.companyService.getUserCompanyId().subscribe(companyId => {
        this.inventoryService.getOutOfStockInventory(companyId).subscribe({
          next: (data) => {
            this.filteredInventories = data;
          },
          error: (error) => {
            console.error('Error fetching out-of-stock inventory', error);
            this.errorMessage = 'Failed to fetch out-of-stock inventory. Please try again.';
          },
        });
      });
    } else {
      this.fetchInventoriesByCompanyId(this.companyId); // Reset to original inventory list when toggle is off
    }
  }
}
