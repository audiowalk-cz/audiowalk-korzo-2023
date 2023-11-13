import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

export enum TutorialSteps {
  "navigation",
  "sound",
  "download",
  "gps",
  "attention",
}

@UntilDestroy()
@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent implements OnInit {
  tutorialStep?: TutorialSteps;
  TutorialSteps = TutorialSteps;
  tutorialStepsOrder = [
    TutorialSteps.navigation,
    TutorialSteps.sound,
    TutorialSteps.download,
    TutorialSteps.gps,
    TutorialSteps.attention,
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      const step = parseInt(params["step"]);

      if (!step || this.tutorialStepsOrder[step - 1] === undefined) this.openDefaultStep();
      this.tutorialStep = this.tutorialStepsOrder[step - 1];
    });
  }

  openStep(step: number, replaceUrl = false) {
    this.router.navigate(["/tutorial"], { queryParams: { step: step + 1 }, replaceUrl });
  }

  openDefaultStep() {
    this.openStep(0, true);
  }

  nextStep() {
    if (this.tutorialStep === undefined) return;
    const currentChapterIndex = this.tutorialStepsOrder.indexOf(this.tutorialStep);
    this.openStep(Math.min(currentChapterIndex + 1, this.tutorialStepsOrder.length - 1));
  }

  previousStep() {
    if (this.tutorialStep === undefined) return;
    const currentChapterIndex = this.tutorialStepsOrder.indexOf(this.tutorialStep);
    if (currentChapterIndex === 0) {
      this.router.navigate(["/"]);
    } else {
      this.openStep(currentChapterIndex - 1);
    }
  }
}
