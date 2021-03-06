import { Component, Type } from '@angular/core';
import { CrudJoiner, StaticPageModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { ImagesFormComponent } from '../forms/images.form';
import { StaticPageFormComponent } from '../forms/static-page.form';
import { TranslationFormComponent } from '../forms/translation.form';
import { VideoFormComponent } from '../forms/video.form';

@Component({
  selector: 'staticpage-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createStaticPage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editStaticPage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'images'">
          <i18n>images</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'videos'">
          <i18n>videos</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n>translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class StaticPageStepperComponent
  extends BaseStepper<StaticPageModel> {

  public root: string = 'markups';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: StaticPageFormComponent
    },
    {
      name: 'images',
      form: ImagesFormComponent
    },
    {
      name: 'videos',
      form: VideoFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(StaticPageModel)
    .with('titleImage')
    .with('images')
    .with('translations').yield('language')
    .with('videos').yield('thumbnail');

  protected model: Type<StaticPageModel> = StaticPageModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

  protected get path(): string {
    return 'static-pages';
  }

}
