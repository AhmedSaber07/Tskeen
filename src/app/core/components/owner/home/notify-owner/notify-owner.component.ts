import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notify-owner',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterModule ],
  templateUrl: './notify-owner.component.html',
  styleUrl: './notify-owner.component.css'
})
export class NotifyOwnerComponent {
}
