import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddGardePharmacyComponent } from '../components/add-garde-pharmacy/add-garde-pharmacy.component';
import { PharmacieService } from '../_services/pharmacie.service';
import { MatDialog } from '@angular/material/dialog';
import { PharmacieModel } from '../_models/PharmacieModel';
import { SnackbarService } from '../_services/snackbar/snackbar.service';
import { GardeService } from '../_services/garde/garde.service';
import { Garde } from '../_models/GardeModel';



@Component({
  selector: 'app-garde',
  imports: [FormsModule, NgFor, MatIconModule],
  templateUrl: './garde.component.html',
  styleUrl: './garde.component.scss',
})
export class GardeComponent implements OnInit {
  startDate: any;
  endDate: any;
  pharmacies: PharmacieModel[] = [];
  filteredGardes: any;
  gardes:Garde [] = [];

  constructor(
    private dialog: MatDialog,
    private pharmacieService: PharmacieService,
    private snackbarService: SnackbarService,
    private gardeService: GardeService
  ) {}
  ngOnInit(): void {
    this.getGarde()
  }
  onFilter() {
    throw new Error('Method not implemented.');
  }

  private getGarde() {
    this.gardeService.recupererGardes().subscribe({
      next: (value) => {
        console.log(value);
        
        this.gardes = []; // Réinitialiser la liste des gardes
        value.forEach((element: any) => {
          this.gardes.push({
            dayOfGarde: element.dayOfGarde,
            pharmacies: element.getPharmacieDtos.map((pharmacie: any) => ({
              id: pharmacie.id,
              code: pharmacie.code,
              name: pharmacie.name,
              enable: pharmacie.enable,
            })),
            enabled: element.enabled,
          });
        });
        console.log('Gardes récupérées :', this.gardes);
        this.filteredGardes =[...this.gardes]
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des gardes :', err);
        this.snackbarService.triggerErrorSnackbar(
          'Erreur lors de la récupération des gardes.'
        );
      },
    });
  }
  private getPharmacys() {
    this.pharmacieService.recupererPharmacies().subscribe({
      next: (data) => {
        this.pharmacies = [];
        data.forEach((element: any) => {
          this.pharmacies.push(
            new PharmacieModel(
              element.id,
              element.code,
              element.name,
              element.enable
            )
          );
        });
        console.log(this.pharmacies);
      },
      error: (err) => {
        console.error('Error fetching pharmacies', err);
      },
    });
  }
  addGarde(): void {
    const dialogRef = this.dialog.open(AddGardePharmacyComponent, {
      width: '90vw',
      maxWidth: 'none',
      data: {
        pharmacies: this.pharmacies,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.state) {
        this.pharmacieService
          .addGarde(
            result.date,
            result.selectedPharmacies.map(
              (pharmacie: PharmacieModel) => pharmacie.id
            )
          )
          .subscribe({
            next: (value) => {
              this.snackbarService.triggerSuccessSnackbar(
                'Garde ajoutée avec succès'
              );
              // this.getGarde();
              console.log('Garde ajoutée :', value);
            },
            error: (err) => {
              this.snackbarService.triggerErrorSnackbar(
                "Erreur lors de l'ajout de la garde"
              );
              console.error("Erreur lors de l'ajout de la garde", err);
            },
          });
      }
    });
  }

  editGarde(garde: any): void {
    console.log('Éditer la garde :', garde);
    // Implémentez la logique pour éditer la garde
  }

  viewGarde(garde: any): void {
    console.log('Voir les détails de la garde :', garde);
    // Implémentez la logique pour afficher les détails de la garde
  }

  deleteGarde(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette garde ?')) {
      console.log('Supprimer la garde avec ID :', id);
      // Implémentez la logique pour supprimer la garde
    }
  }
}
