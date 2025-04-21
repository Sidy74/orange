import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { PharmacieModel } from '../../_models/PharmacieModel';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-pharmacy',
  imports: [FormsModule],
  templateUrl: './edit-pharmacy.component.html',
  styleUrl: './edit-pharmacy.component.scss'
})
export class EditPharmacyComponent {

  @Input() pharmacie: PharmacieModel = new PharmacieModel(); 
  @Output() update = new EventEmitter<PharmacieModel>(); 


  constructor(
    public dialogRef: MatDialogRef<EditPharmacyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PharmacieModel
  ) {
    this.pharmacie = { ...data }; 
  }

  onClose(): void {
   this.dialogRef.close({close :false, pharmacie:null});
  }

  onSubmit(): void {
    console.log('Pharmacie modifiée :', this.pharmacie);
    this.dialogRef.close({state :true, pharmacie:this.pharmacie})
  }


}
