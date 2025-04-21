import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddGardePharmacyComponent } from '../add-garde-pharmacy/add-garde-pharmacy.component';
import { PharmacieService } from '../../_services/pharmacie.service';
import { PharmacieModel } from '../../_models/PharmacieModel';

@Component({
  selector: 'app-pharmacie-de-garde',
  imports: [NgFor,SlicePipe,NgIf,MatIconModule,FormsModule],
  templateUrl: './pharmacie-de-garde.component.html',
  styleUrl: './pharmacie-de-garde.component.scss'
})
export class PharmacieDeGardeComponent implements OnInit {
  gardes: any[] = [];
  pharmacies: PharmacieModel[] = [];

  filteredGardes = [...this.gardes];
  startDate: string = '';
  endDate: string = '';
  searchTerm: string = '';

  constructor(private dialog: MatDialog,private pharmacieService :PharmacieService){}
  ngOnInit(): void {
    this.getPharmacys()
   this.getGarde(); 
  }

  private getGarde() {
    this.pharmacieService.recupererGardes(null, null).subscribe(gardes => {
      console.log('Gardes récupérées:', gardes);
      this.gardes = gardes;
      this.filteredGardes = [...this.gardes];
    });
  }

  private getPharmacys() {
    this.pharmacieService.recupererPharmacies().subscribe({
      next: (data) => {
      
        this.pharmacies = [];
         data.forEach((element: any) => {
          this.pharmacies.push(new PharmacieModel(element.id,element.code , element.name,element.enable));  
        });;
        console.log(this.pharmacies);
        
       
      },
      error: (err) => {
        console.error('Error fetching pharmacies', err);
      }
    });
  }

  addGarde(): void {
   

      const dialogRef = this.dialog.open(AddGardePharmacyComponent, {
        width: '90vw',
        maxWidth:'none',
        data: {
          pharmacies: this.pharmacies
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result.state) {
          this.pharmacieService.addGarde(result.date, result.selectedPharmacies.map((pharmacie: PharmacieModel) => pharmacie.id)).subscribe({
            next: (value) => {
              this.triggerSuccessSnackbar('Garde ajoutée avec succès');
              this.getGarde(); 
              console.log('Garde ajoutée :', value);
            },
            error: (err) => {
              this.triggerErrorSnackbar('Erreur lors de l\'ajout de la garde');
              console.error('Erreur lors de l\'ajout de la garde', err);
            }
          });
        }
      });
    }


  onSearch(): void {
    this.filteredGardes = this.gardes.filter(garde =>
      garde.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      garde.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onFilter(): void {
    if (this.startDate && this.endDate) {
      this.filteredGardes = this.gardes.filter(garde =>
        garde.joursDeGarde.some((jour: string) => jour >= this.startDate && jour <= this.endDate)
      );
    }
  }

  showAllDays(joursDeGarde: string[]): void {
    alert('Jours de garde :\n' + joursDeGarde.join('\n'));
  }

  viewDetails(garde: any): void {
    alert(`Détails de la pharmacie :\nNom: ${garde.name}\nCode: ${garde.code}\nJours de garde: ${garde.joursDeGarde.join(', ')}\nStatut: ${garde.enabled ? 'Actif' : 'Inactif'}`);
  }


  showSnackbar: boolean = false;
  snackbarMessage: string = '';
  snackbarType: 'success' | 'error' = 'success';

  triggerSuccessSnackbar(message:string): void {
    this.snackbarMessage = message ;
    this.snackbarType = 'success';
    this.showSnackbar = true;

    // Masquer le snackbar après un délai
    setTimeout(() => {
      this.showSnackbar = false;
    }, 3000);
  }

  triggerErrorSnackbar(message:string): void {
    this.snackbarMessage =  message;
    this.snackbarType = 'error';
    this.showSnackbar = true;

    // Masquer le snackbar après un délai
    setTimeout(() => {
      this.showSnackbar = false;
    }, 3000);
  } 
}
