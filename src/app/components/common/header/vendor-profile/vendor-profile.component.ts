import {Profile} from '../../../../entities/profile';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  @Input() public profile: Profile;

  constructor() {
  }

  ngOnInit() {
  }

}
