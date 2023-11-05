import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: "Trasa",
      icon: "map",
      text: "Trasa začíná na piazettě Národního divadla, má 7 zastávek a trvá 45 minut.",
    },
    {
      title: "Poslech",
      icon: "phone",
      text: "Audio si můžete na webu stáhnout předem offline. Objem dat je cca 70MB.",
    }
  ];

}
