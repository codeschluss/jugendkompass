import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Box, TokenProvider } from '@wooportal/core';
import { BaseForm, ChipListFieldComponent, FormField, SelectFieldComponent, StringFieldComponent, Tests } from '@wooportal/forms';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../realm/models/activity.model';
import { CategoryModel } from '../../../realm/models/category.model';
import { KeywordModel } from '../../../realm/models/keyword.model';
import { OrganisationModel } from '../../../realm/models/organisation.model';
import { TargetGroupModel } from '../../../realm/models/target-group.model';
import { TranslationProvider } from '../../../realm/providers/translation.provider';
import { UserProvider } from '../../../realm/providers/user.provider';
import { TranslationBase } from '../../../realm/translations/translation.base';
import { ClientPackage } from '../../../utils/package';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@compilation">compilation</i18n>
      </label>
      <nav>
        <button mat-button
          color="primary"
          (click)="fillUserData()">
          <i18n i18n="@@fillUserData">fillUserData</i18n>
        </button>
        <button mat-button
          color="primary"
          [disabled]="!this.organisation"
          (click)="fillOrganisationData()">
          <i18n i18n="@@fillOrganisationData">fillOrganisationData</i18n>
        </button>
      </nav>
    </section>

    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'category'">
          <i18n i18n="@@category">category</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'contactName'">
          <i18n i18n="@@contactName">contactName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@email">email</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n i18n="@@organisation">organisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n><sup>#</sup>
        </ng-container>
        <ng-container *ngSwitchCase="'tags'">
          <i18n i18n="@@keywords">keywords</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'targetGroups'">
          <i18n i18n="@@targetGroups">targetGroups</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityFormComponent
  extends TranslationBase<ActivityModel> {

  public fields: FormField[] = [
    {
      name: 'organisation',
      input: SelectFieldComponent,
      label: 'name',
      model: OrganisationModel,
      tests: [Validators.required]
    },
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    },
    {
      name: 'contactName',
      input: StringFieldComponent
    },
    {
      name: 'phone',
      input: StringFieldComponent,
      tests: [Tests.neither('phone', 'mail')],
      type: 'tel'
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [
        Tests.neither('phone', 'mail'),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ],
      type: 'email'
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      label: 'name',
      model: CategoryModel,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      label: 'name',
      model: TargetGroupModel,
      multi: true
    },
    {
      name: 'tags',
      input: ChipListFieldComponent,
      label: 'name',
      model: KeywordModel
    }
  ];

  public model: Type<ActivityModel> = ActivityModel;

  public get organisation(): OrganisationModel {
    return this.group.get('organisation').value;
  }

  public constructor(
    private userProvider: UserProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(translationProvider, route, tokenProvider);
  }

  public fillOrganisationData(): void {
    const organisation = this.group.get('organisation').value;
    this.group.get('contactName').patchValue(organisation.name);
    this.group.get('mail').patchValue(organisation.mail);
    this.group.get('phone').patchValue(organisation.phone);
  }

  public fillUserData(): void {
    this.userProvider.readOne(this.token.id).subscribe((user) => {
      this.group.get('contactName').patchValue(user.name);
      this.group.get('mail').patchValue(user.username);
      this.group.get('phone').patchValue(user.phone);
    });
  }

  public persist(): Observable<any> {
    this.item.addressId = this.group.get('address').value.id;
    this.item.categoryId = this.group.get('category').value.id;
    this.item.organisationId = this.group.get('organisation').value.id;

    return super.persist().pipe(
      mergeMap((item) => this.tokenProvider.refresh().pipe(map(() => item)))
    );
  }

  protected ngPostInit(): void {
    if (this.item.id && !this.token.createdActivities.includes(this.item.id)) {
      this.fields[0].locked = true;
    }

    if (!this.token[ClientPackage.config.jwtClaims.superUser]) {
      this.fields[0].options = Array.from(new Set([
        ...this.token[ClientPackage.config.jwtClaims.organisationAdmin],
        ...this.token[ClientPackage.config.jwtClaims.organisationUser]
      ])).map((id) => this.fields[0].options.find((o) => o.id === id));
    }
  }

  protected cascade(item: ActivityModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    const schedules = this.updated('schedules');
    if (schedules.add.length) { links.push(provider
      .pasteSchedules(item.id, schedules.add)); }
    if (schedules.del.length) { links.push(provider
      .unlinkSchedules(item.id, schedules.del.map((i) => i.id))); }

    const tags = this.updated('tags');
    if (tags.add.length) { links.push(provider
      .pasteTags(item.id, tags.add)); }
    if (tags.del.length) { links.push(provider
      .unlinkTags(item.id, tags.del.map((i) => i.id))); }

    const targetGroups = this.updated('targetGroups');
    if (targetGroups.add.length) { links.push(provider
      .linkTargetGroups(item.id, targetGroups.add.map((i) => i.id))); }
    if (targetGroups.del.length) { links.push(provider
      .unlinkTargetGroups(item.id, targetGroups.del.map((i) => i.id))); }

    if (this.item.id) {
      const addrId = this.item.address && this.item.address.id;
      if (addrId !== this.item.addressId) { links.push(provider
        .relinkAddress(item.id, Box(this.item.addressId))); }

      const goryId = this.item.category && this.item.category.id;
      if (goryId !== this.item.categoryId) { links.push(provider
        .relinkCategory(item.id, Box(this.item.categoryId))); }

      const orgaId = this.item.organisation && this.item.organisation.id;
      if (orgaId !== this.item.organisationId) { links.push(provider
        .relinkOrganisation(item.id, Box(this.item.organisationId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
