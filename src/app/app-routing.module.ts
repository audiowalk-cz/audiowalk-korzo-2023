import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EndComponent } from "./pages/end/end.component";
import { HomeComponent } from "./pages/home/home.component";
import { TracklistComponent } from "./pages/tracklist/tracklist.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";
import { WalkComponent } from "./pages/walk/walk.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "walk/:track", component: WalkComponent },
  { path: "tutorial", component: TutorialComponent },
  { path: "end", component: EndComponent },
  { path: "tracklist", component: TracklistComponent },
  { path: "walk", pathMatch: "full", redirectTo: "walk/1" },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
