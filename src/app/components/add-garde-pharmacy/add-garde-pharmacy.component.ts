import { NgFor } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PharmacieModel } from '../../_models/PharmacieModel';

export class PharmacieModelSelect {
  pharmacieModel!: PharmacieModel
  selected?: boolean; // Ajout de la propriété optionnelle 'selected'
}

@Component({
  selector: 'app-add-garde-pharmacy',
  imports: [FormsModule,NgFor],
  templateUrl: './add-garde-pharmacy.component.html',
  styleUrl: './add-garde-pharmacy.component.scss'
})
export class AddGardePharmacyComponent {

  @Input() pharmacies: PharmacieModelSelect[] =[];
  @Output() submit = new EventEmitter<any[]>();

  filteredPharmacies = [...this.pharmacies];
  searchTerm: string = '';
  selectedDate: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddGardePharmacyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pharmacies: any[] }
  ) {
    
    this.pharmacies = data.pharmacies.map(pharmacie => ({
      pharmacieModel: pharmacie,
      selected: false // Initialiser la sélection à false
    }));
    this.filteredPharmacies = [...this.pharmacies];
  }

  onSearch(): void {
    this.filteredPharmacies = this.pharmacies.filter(pharmacie =>
      pharmacie.pharmacieModel.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      pharmacie.pharmacieModel.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onFilter(): void {
    this.filteredPharmacies = this.pharmacies.filter(pharmacie => pharmacie.pharmacieModel.isEnabled);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const selectedPharmacies = this.pharmacies.filter(pharmacie => pharmacie.selected);

    this.dialogRef.close({
      state :true,
      selectedPharmacies: selectedPharmacies.map(pharmacie => pharmacie.pharmacieModel), 
      date: this.selectedDate
    });   
  }

}

