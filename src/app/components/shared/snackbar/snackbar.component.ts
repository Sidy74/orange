import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  imports: [NgClass],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  @Input() message: string = ''; // Message de la notification
  @Input() type: 'success' | 'error' = 'success'; // Type de notification (success ou error)
  @Input() duration: number = 3000; // Durée d'affichage en millisecondes

  visible: boolean = true;

  ngOnInit(): void {
    // Masquer automatiquement le snackbar après la durée spécifiée
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
  get snackbarClass(): string {
    return this.type === 'success' ? 'snackbar-success' : 'snackbar-error';
  }

}
