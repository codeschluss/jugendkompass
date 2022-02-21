import { AfterViewInit, Component, Type } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreSettings, LanguageModel, SessionProvider, StaticPageModel, TokenProvider, TranslationProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { SelectFieldComponent } from '../fields/select.field';

@Component({
  selector: 'static-page-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n>content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'language'">
          <i18n>language</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `, `
    <section>
      <label class="mat-body-strong">
        <i18n>compilation</i18n>
      </label>
      <nav>
        <button mat-stroked-button
          color="primary"
          [disabled]="!translation.value"
          (click)="translate()">
          <i18n>translateFrom</i18n>
        </button>
        <mat-form-field>
          <mat-select [formControl]="translation">
            <mat-option [value]="language" *ngFor="let language of languages">
              {{ language.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </nav>
    </section>
  `)
})

export class StaticPageFormComponent
  extends BaseForm<StaticPageModel>
  implements AfterViewInit {

  declare public item: any;

  public fields: FormField[] = [
    {
      name: 'language',
      input: SelectFieldComponent,
      label: 'name',
      model: LanguageModel,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: EditorFieldComponent,
      model: StaticPageModel,
      tests: [Validators.required]
    }
  ];

  public model: Type<StaticPageModel> = StaticPageModel;

  public translation: FormControl = new FormControl();

  private language: LanguageModel;

  public get languages(): LanguageModel[] {
    return this.item.translatables.filter((t) => {
      return t.content && t.language.locale !== this.language.locale;
    }).map((translatable) => translatable.language);
  }

  public constructor(
    private sessionProvider: SessionProvider,
    private settings: CoreSettings,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public ngAfterViewInit(): void {
    this.group.get('language').valueChanges.subscribe((value) => {
      this.language = value;
      this.reset();
    });
  }

  public persist(): Observable<any> {
    return this.translationProvider.update(new this.model({
      content: this.group.get('content').value,
      id: this.item.id,
      language: this.language,
      tagId: this.item.tagId
    }), 'markups').pipe(tap((result) => {
      const target = this.item.translatables.find((translatable) => {
        return translatable.language.locale === this.language.locale;
      });

      if (target) {
        target.content = result.content;
      } else {
        this.item.translatables.push(Object.assign(result, {
          language: this.language
        }));
      }

      this.reset();
    }));
  }

  public reset(): void {
    this.group.patchValue({
      content: this.item.translatables?.find((translatable) => {
        return translatable.language.locale === this.language.locale;
      })?.content
    }, { emitEvent: false });

    this.group.markAsPristine();
    this.translation.reset();
  }

  public translate(): void {
    const content = this.item.translatables.find((translatable) => {
      return translatable.language.locale === this.translation.value.locale
    }).content;

    this.translationProvider.translate(
      { content },
      [this.language.locale],
      this.translation.value.locale
    ).subscribe((translations) => {
      this.group.patchValue({
        content: translations[0].translations.content
      }, { emitEvent: false })
    });
  }

  protected ngPostInit(): void {
    const fallback = this.route.snapshot.data.language.find((lang) =>
      lang.locale === this.settings.defaults.language);
    const selected = this.route.snapshot.data.language.find((lang) =>
      lang.locale === this.sessionProvider.getLanguage());

    this.language = this.fields[0].value = selected || fallback;
  }

}
