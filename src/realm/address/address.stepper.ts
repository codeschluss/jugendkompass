import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { AddressFormComponent } from '../address/address.form';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createActivity">createActivity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editActivity">editActivity</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class AddressStepperComponent
  extends BaseStepper<AddressModel> {

  public root: string = 'address';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: AddressFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(AddressModel)
    .with('suburb');

  protected model: Type<AddressModel> = AddressModel;

  public get title(): string {
    return `
      ${this.values[this.root].street}
      ${this.values[this.root].houseNumber},
      ${this.values[this.root].place}
    `;
  }

}
