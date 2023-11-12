import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChaptersComponent } from "./pages/chapters/chapters.component";
import { EndComponent } from "./pages/end/end.component";
import { HomeComponent } from "./pages/home/home.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";
import { WalkComponent } from "./pages/walk/walk.component";
import { TestComponent } from "./pages/test/test.component";
import { ShareComponent } from "./pages/share/share.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "walk", component: WalkComponent },
  { path: "tutorial", component: TutorialComponent },
  { path: "end", component: EndComponent },
  { path: "share", component: ShareComponent },
  { path: "chapters", component: ChaptersComponent },
  { path: "test", component: TestComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
