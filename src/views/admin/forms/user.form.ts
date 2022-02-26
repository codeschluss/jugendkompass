import { AfterViewInit, Component, OnDestroy, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, forkJoin, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PlatformProvider, TokenProvider, TranslationProvider, UserModel, UserProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { ImageFieldComponent } from '../fields/image.field';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'avatar'">
          <i18n>avatar</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'password'">
          <i18n>password</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'passwordConfirm'">
          <i18n>passwordConfirm</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n>phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'username'">
          <i18n>email</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class UserFormComponent
  extends BaseForm<UserModel>
  implements AfterViewInit, OnDestroy {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'username',
      input: InputFieldComponent,
      tests: [
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
      ],
      type: 'email'
    },
    {
      name: 'phone',
      input: InputFieldComponent,
      type: 'tel'
    },
    {
      name: 'avatar',
      input: ImageFieldComponent
    },
    {
      name: 'password',
      input: InputFieldComponent,
      tests: [
        Validators.minLength(8),
        Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
        Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
        Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/)
      ],
      type: 'password'
    },
    {
      name: 'passwordConfirm',
      input: InputFieldComponent,
      locked: true,
      tests: [
        Validators.minLength(8),
        Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
        Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
        Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/)
      ],
      type: 'password'
    }
  ];

  public model: Type<UserModel> = UserModel;

  private changes: Subscription = EMPTY.subscribe();

  public constructor(
    private platformProvider: PlatformProvider,
    private userProvider: UserProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public ngAfterViewInit(): void {
    this.changes = this.group.valueChanges.subscribe((v) => this.validate(v));
  }

  public ngOnDestroy(): void {
    this.changes.unsubscribe();
  }

  public persist(): Observable<any> {
    return super.persist().pipe(tap((item) => {
      if (item.username !== this.item.username) {
        this.tokenProvider.remove();
      } else if (this.item.avatar?.id !== this.group.get('avatar').value?.id) {
        this.platformProvider.reload();
      } else {
        this.group.reset(Object.assign(item, {
          avatar: this.group.get('avatar').value
        }));
      }
    }));
  }

  protected cascade(item: UserModel): Observable<any> {
    const links = [];

    if (this.group.get('avatar').dirty) {
      const avatar = this.group.get('avatar').value;

      if (avatar) {
        links.push(this.userProvider.linkAvatar(item.id, avatar));
      } else {
        // links.push(this.userProvider.unlinkAvatar(item.id));
      }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

  private validate(change: any): void {
    const ctrl1 = this.group.get('password');
    const ctrl2 = this.group.get('passwordConfirm');
    const { password: pw1, passwordConfirm: pw2 } = change;

    if (pw1 && ctrl2.disabled) {
      ctrl2.enable({ emitEvent: false });
    }

    if (!pw1 && ctrl2.enabled) {
      ctrl2.patchValue(null, { emitEvent: false });
      ctrl2.disable({ emitEvent: false });
    }

    if (pw1 && ctrl2.enabled && pw1 !== pw2) {
      ctrl1.setErrors({ mismatch: true });
      ctrl2.setErrors({ mismatch: true });
    } else {
      ctrl1.updateValueAndValidity({ emitEvent: false });
      ctrl2.updateValueAndValidity({ emitEvent: false });
    }
  }

}
