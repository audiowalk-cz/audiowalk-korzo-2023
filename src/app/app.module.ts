import { ErrorHandler, NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ServiceWorkerModule } from "@angular/service-worker";
import { PinchZoomModule } from "@meddv/ngx-pinch-zoom";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppErrorHandler } from "./app.error-handler";
import { ChapterInfoComponent } from "./components/chapter-info/chapter-info.component";
import { ChapterPhotoComponent } from "./components/chapter-photo/chapter-photo.component";
import { MapComponent } from "./components/map/map.component";
import { PageContentComponent } from "./components/page-content/page-content.component";
import { PageFooterComponent } from "./components/page-footer/page-footer.component";
import { PageComponent } from "./components/page/page.component";
import { PlayerButtonComponent } from "./components/player-button/player-button.component";
import { PlayerControlsComponent } from "./components/player-controls/player-controls.component";
import { PlayerMenuItemComponent } from "./components/player-menu-item/player-menu-item.component";
import { PlayerMenuComponent } from "./components/player-menu/player-menu.component";
import { PlayerPlayButtonComponent } from "./components/player-play-button/player-play-button.component";
import { PlayerComponent } from "./components/player/player.component";
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";
import { TutorialAttentionComponent } from "./components/tutorial-attention/tutorial-attention.component";
import { TutorialDownloadComponent } from "./components/tutorial-download/tutorial-download.component";
import { TutorialGpsComponent } from "./components/tutorial-gps/tutorial-gps.component";
import { TutorialNavigationComponent } from "./components/tutorial-navigation/tutorial-navigation.component";
import { TutorialSoundComponent } from "./components/tutorial-sound/tutorial-sound.component";
import { VideoComponent } from "./components/video/video.component";
import { AuthorsComponent } from "./pages/authors/authors.component";
import { ChaptersComponent } from "./pages/chapters/chapters.component";
import { EndComponent } from "./pages/end/end.component";
import { HomeComponent } from "./pages/home/home.component";
import { LegalComponent } from "./pages/legal/legal.component";
import { ShareComponent } from "./pages/share/share.component";
import { TestComponent } from "./pages/test/test.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";
import { WalkComponent } from "./pages/walk/walk.component";
import { TimePipe } from "./pipes/time.pipe";
import { PlayerProgressComponent } from './components/player-progress/player-progress.component';

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
    TestComponent,
    ShareComponent,
    TutorialNavigationComponent,
    TutorialSoundComponent,
    TutorialDownloadComponent,
    TutorialGpsComponent,
    TutorialAttentionComponent,
    LegalComponent,
    AuthorsComponent,
    ChapterPhotoComponent,
    PlayerButtonComponent,
    PlayerPlayButtonComponent,
    PlayerControlsComponent,
    PlayerProgressComponent,
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
    PinchZoomModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
