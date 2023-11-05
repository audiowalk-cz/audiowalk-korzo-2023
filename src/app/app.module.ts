import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChapterInfoComponent } from "./components/chapter-info/chapter-info.component";
import { MapComponent } from "./components/map/map.component";
import { PageContentComponent } from "./components/page-content/page-content.component";
import { PageFooterComponent } from "./components/page-footer/page-footer.component";
import { PageComponent } from "./components/page/page.component";
import { PlayerMenuItemComponent } from "./components/player-menu-item/player-menu-item.component";
import { PlayerMenuComponent } from "./components/player-menu/player-menu.component";
import { PlayerComponent } from "./components/player/player.component";
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";
import { ChaptersComponent } from "./pages/chapters/chapters.component";
import { EndComponent } from "./pages/end/end.component";
import { HomeComponent } from "./pages/home/home.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";
import { WalkComponent } from "./pages/walk/walk.component";
import { TimePipe } from "./pipes/time.pipe";
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    TutorialComponent,
    WalkComponent,
    EndComponent,
    MapComponent,
    ChapterInfoComponent,
    TimePipe,
    PageContentComponent,
    PageFooterComponent,
    PageComponent,
    ChaptersComponent,
    ProgressBarComponent,
    PlayerMenuComponent,
    PlayerMenuItemComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
