import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PharmacieModel } from '../../_models/PharmacieModel';
import { PharmacieService } from '../../_services/pharmacie.service';
import { AddPharmacyComponent } from '../add-pharmacy/add-pharmacy.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { EditPharmacyComponent } from '../edit-pharmacy/edit-pharmacy.component';
import { SnackbarService } from '../../_services/snackbar/snackbar.service';

@Component({
  selector: 'app-pharmacies',
  imports: [MatIconModule, FormsModule, SnackbarComponent],
  templateUrl: './pharmacies.component.html',
  styleUrl: './pharmacies.component.scss'
})
export class PharmaciesComponent implements OnInit {

  
  pharmacies: PharmacieModel[] = []
  filteredPharmacies: PharmacieModel[] = [...this.pharmacies]; // Liste filtrée
  searchTerm: string = ''; // Terme de recherche

  onSearch() {
    this.filteredPharmacies = this.pharmacies.filter(pharmacie =>
      pharmacie.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      pharmacie.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  constructor(private pharmacieService : PharmacieService,
    public snackbarService:SnackbarService,
     private dialog: MatDialog){}
  
  ngOnInit() {
    this.getPharmacys();
    
  }
  private getPharmacys() {
    this.pharmacieService.recupererPharmacies().subscribe({
      next: (data) => {
        console.log(data);
        this.pharmacies = [];
         data.forEach((element: any) => {
          this.pharmacies.push(new PharmacieModel(element.id,element.code , element.name,element.enable));  
        });;
        this.filteredPharmacies = [...this.pharmacies]; 
      },
      error: (err) => {
        console.error('Error fetching pharmacies', err);
      }
    });
  }

  openAddPharmacyDialog() {
      const dialogRef = this.dialog.open(AddPharmacyComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.close) {
          this.pharmacieService.ajouterPharmacie(result.pharmacie).subscribe({
            next: (data) => {
              console.log('Pharmacie ajoutée avec succès', data);
              this.getPharmacys();
              this.snackbarService.triggerSuccessSnackbar('Pharmacie ajoutée avec succès');
            },
            error: (err) => {
              this.snackbarService.triggerErrorSnackbar('Erreur lors de l\'ajout de la pharmacie');
              console.error('Erreur lors de l\'ajout de la pharmacie', err);
            }
          });
        }
      });
    }

    openConfirmDialog(pharmacie: PharmacieModel) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '400px',
        data  :{message : `Êtes-vous sûr de vouloir supprimer  ${pharmacie.name} ?`}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.pharmacieService.supprimerPharmacie(pharmacie.code).subscribe({
            next : (value) => {
                console.log(value);
                this.snackbarService.triggerSuccessSnackbar('La pharmacie a été ajoutée avec succès.');
                this.getPharmacys();
                
            },
            error: (err) => {
              this.snackbarService.triggerErrorSnackbar('Une erreur est survenue lors de l’ajout de la pharmacie.')
              console.error('Erreur lors de la suppression de la pharmacie', err);
            }
          });
        } else {
          console.log('Action annulée');
        }
      });
    }
   
  editPharmacy(pharmacie: PharmacieModel): void {
    const dialogRef = this.dialog.open(EditPharmacyComponent, {
      width: '400px',
      data: { ...pharmacie }
    });

    dialogRef.afterClosed().subscribe((result) => {
            if(result.state) {
        this.pharmacieService.modifierPharmacie (result.pharmacie).subscribe({
          next: (data) => {
            this.snackbarService.triggerSuccessSnackbar('Pharmacie modifiée avec succès.');
            this.getPharmacys();
          },
          error: (err) => {
            console.log('Erreur lors de la modification de la pharmacie.', err);
            this.snackbarService.triggerErrorSnackbar('Erreur lors de la modification de la pharmacie.');
          }
        });
      }
    });
  }
  
    
    }

  

