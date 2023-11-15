import { Component } from "@angular/core";
import { version } from "src/version";

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
      type: "icon",
      text: "Trasa začíná u Národního divadla, má 7 zastávek a trvá cca 70 minut.",
    },
    {
      title: "Poslech",
      icon: "phone",
      type: "icon",
      text: "Audio si můžete na webu stáhnout předem offline. Objem dat je cca 70MB.",
    },
    {
      title: "Díky, že můžem",
      icon: "assets/img/logo_dikyzemuzem.svg",
      type: "img",
      text: "Projekt byl vytvořen pod&nbsp;záštitou organizace Díky,&nbsp;že&nbsp;můžem,&nbsp;z.&nbsp;s.",
    },
    {
      title: "DAMU",
      icon: "assets/img/logo_amu.svg",
      type: "img",
      text: "Audiowalk je dílem studentů z&nbsp;Divadelní fakulty AMU",
    },
  ];

  version = version;
}
