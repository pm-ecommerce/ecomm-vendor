import { AccountService } from '../../../services/account.service';
import { ApiResponse } from '../../../shared/api-response';
import { Profile } from '../../../entities/profile';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/login.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ExtJsService } from '../../../services/ext-js.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username = 'Vendor';
  profile: Profile;
  @ViewChild('form', { static: true })
  public form: TemplateRef<any>;

  constructor(public app: ExtJsService, private lservice: AuthService, private service: AccountService, private modal: ModalService, private toastr: ToastrService) {
  }

  public logout() {
    this.lservice.logout();

  }

  public ngOnInit(): void {
    this.username = this.lservice.getCurrentUser().name || 'Vendor';
  }

  close() {
    this.modal.close();
  }

  public changePasswordForm() {
    this.profile = new Profile(this.lservice.getCurrentUser());
    console.log(this.profile);
    this.modal.open(this.form, 'modal-lg');
  }

  save() {
    const subs$ = this.service.patch('/' + this.profile.id + '/update-password/', this.profile)
      .subscribe(
        (response: ApiResponse<any>) => {
          subs$.unsubscribe();
          if (response.status === 200) {
            this.toastr.success(response.message);
            this.close();
          } else {
            this.toastr.error(response.message);
          }
        },
        (error: ApiResponse<any>) => {
          subs$.unsubscribe();
          this.toastr.error(error.message || 'An unexpected error occurred. Please try again.');
        }
      );

  }
}
