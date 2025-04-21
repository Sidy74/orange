import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }


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
