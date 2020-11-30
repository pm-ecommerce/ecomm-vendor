import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {AttributeOption} from '../../entities/attribute-option';
import {Product} from '../../entities/product';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-attr-option',
  templateUrl: './attr-option.component.html',
  styleUrls: ['./attr-option.component.scss']
})
export class AttrOptionComponent implements OnInit {

  @Input() public option: AttributeOption;
  @Input() public attribute: any;
  @Input() public product: Product;

  @Output() public optionSave: EventEmitter<{ option: AttributeOption, attribute: any }>;

  @ViewChild('optionForm', {static: false}) private template: TemplateRef<any>;

  constructor(private modal: ModalService) {
    this.optionSave = new EventEmitter<{ option: AttributeOption, attribute: any }>();
  }

  public bootstrap() {
  }


  public saveOption() {
    this.modal.close();

    if (this.option.price > 0) {
      this.option.price = +(this.option.price);
    }

    this.optionSave.next({option: this.option, attribute: this.attribute});
  }

  public closeOption() {
    this.modal.close();
    this.optionSave.next();
  }

  public async ngOnInit() {
    console.log('Activated');
    await this.bootstrap();
    this.modal.open(this.template);
  }

}
