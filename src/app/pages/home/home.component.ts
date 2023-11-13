import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  features = [
    {
      title: "Trasa",
      icon: "map",
      text: "Trasa začíná u Národního divadla, má 7 zastávek a trvá cca 70 minut.",
    },
    {
      title: "Poslech",
      icon: "phone",
      text: "Audio si můžete na webu stáhnout předem offline. Objem dat je cca 70MB.",
    },
    {
      title: "Díky, že můžem",
      icon: "heart",
      text: "Projekt byl vytvořen pod záštitou projektu Díky, že můžem, z. s.",
    },
    {
      title: "DAMU",
      icon: "heart",
      text: "Audiowalk byl natočen díky umělcům z Divadelní fakulty AMU",
    },
  ];
}
