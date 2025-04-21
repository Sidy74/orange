import { Component } from '@angular/core';
import { PharmacieModel } from '../../_models/PharmacieModel';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-pharmacy',
  imports: [FormsModule],
  templateUrl: './add-pharmacy.component.html',
  styleUrl: './add-pharmacy.component.scss'
})
export class AddPharmacyComponent {


  pharmacie : PharmacieModel =new PharmacieModel(); 

  constructor(public dialogRef: MatDialogRef<AddPharmacyComponent>) {}

  onSubmit() {
    // Envoyer les données de la pharmacie au backend ou au parent
    console.log('Pharmacie ajoutée :', this.pharmacie);
    this.dialogRef.close({close :true, pharmacie:  this.pharmacie}); // Fermer le modal et renvoyer les données
  }

  onClose(){

    this.dialogRef.close({close :false, pharmacie:null});
  }

}
