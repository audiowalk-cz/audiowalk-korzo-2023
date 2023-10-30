import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./components/player/player.component";
import { HomeComponent } from "./pages/home/home.component";
import { TutorialComponent } from "./pages/tutorial/tutorial.component";
import { WalkComponent } from './pages/walk/walk.component';
import { EndComponent } from './pages/end/end.component';
import { MapComponent } from './components/map/map.component';
import { TrackInfoComponent } from './components/track-info/track-info.component';
import { TimePipe } from './pipes/time.pipe';
import { PageContentComponent } from './components/page-content/page-content.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageComponent } from './components/page/page.component';
import { TracklistComponent } from './pages/tracklist/tracklist.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, HomeComponent, PlayerComponent, TutorialComponent, WalkComponent, EndComponent, MapComponent, TrackInfoComponent, TimePipe, PageContentComponent, PageFooterComponent, PageComponent, TracklistComponent, ProgressBarComponent],
  imports: [BrowserModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
