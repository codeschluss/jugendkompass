import { AfterViewInit, Component, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { merge } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RoutingComponent, TokenProvider, UserModel, UserProvider } from '../../../core';

@Component({
  styleUrls: ['register.component.sass'],
  templateUrl: 'register.component.html'
})

export class RegisterPageComponent
  extends RoutingComponent
  implements AfterViewInit {

  @Output() checkedChanged = false;

  public email: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  public name: FormControl = new FormControl(null, [
    Validators.required
  ]);

  //public becomeBlogger: FormControl = new FormControl(this.checked);

  public password: FormControl = new FormControl(null, [
    Validators.minLength(8),
    Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
    Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
    Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
    Validators.required
  ]);

  public passwordConfirm: FormControl = new FormControl(null, [
    Validators.minLength(8),
    Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
    Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
    Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
    Validators.required
  ]);

  public get valid(): boolean {
    return true
      && this.email.valid
      && this.name.valid
      && this.password.valid
      && this.passwordConfirm.valid;
  }

  public get passwordValid(): boolean {
    return true
      && this.password.valid
      && this.passwordConfirm.valid;
  }

  protected get routing(): Route {
    return {
      path: 'register'
    };
  }

  public constructor(
    private router: Router,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.passwordConfirm.disable();

    merge(
      this.password.valueChanges,
      this.passwordConfirm.valueChanges
    ).subscribe(() => this.validate());
  }

  onCheckBoxChange(){
    this.checkedChanged = !this.checkedChanged;
  }

  public register(): void {
    this.userProvider.create(new UserModel({
      name: this.name.value,
      password: this.password.value,
      username: this.email.value,
    })).pipe(mergeMap((user) => this.tokenProvider.login(
      user.username,
      this.password.value
    ))).subscribe((tokens) => this.router.navigate([
      '/',
      'admin',
      'account',
      tokens.access.id
    ]));
    console.log(this.checkedChanged);
    if(this.checkedChanged){
      setTimeout(() => this.joinBloggers(),5000)
      console.log('joined bloggers reached');
    } else {
      console.log('never joined bloggers');
    }
  }

  public joinBloggers(): void {
    this.userProvider.linkBlogger().subscribe(() => this.reload());
  }

  protected reload(): void {
    this.tokenProvider.refresh().subscribe(() => {
      this.router.resetConfig(this.router.config);
      this.router.navigate([], {
        queryParamsHandling: 'preserve',
        skipLocationChange: true
      });
    });
  }

  private validate(): void {
    const ctrl1 = this.password;
    const ctrl2 = this.passwordConfirm;

    if (ctrl1.value && ctrl2.disabled) {
      ctrl2.enable({ emitEvent: false });
    }

    if (!ctrl1.value && ctrl2.enabled) {
      ctrl2.patchValue(null, { emitEvent: false });
      ctrl2.disable({ emitEvent: false });
    }

    if (ctrl1.value && ctrl2.enabled && ctrl1.value !== ctrl2.value) {
      ctrl1.setErrors({ mismatch: true });
      ctrl2.setErrors({ mismatch: true });
    } else {
      ctrl1.updateValueAndValidity({ emitEvent: false });
      ctrl2.updateValueAndValidity({ emitEvent: false });
    }
  }

}
