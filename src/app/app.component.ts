import { Component, HostListener, OnInit } from '@angular/core';



import { CommonModule } from '@angular/common';
import { SidebardComponent } from "./components/sidebard/sidebard.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SidebardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pharmacie_garde';
  
}
