import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductServiceService} from '../../../services/product-service.service';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {SlugPipe} from '../../../pipes/slug.pipe';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Product} from '../../../entities/product';
import {ApiResponse} from '../../../shared/api-response';
import {AttributeOption} from '../../../entities/attribute-option';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {

  constructor(private service: ProductServiceService, private cservice: CategoryService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.max(99999)]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  get category() {
    return this.form.get('category');
  }

  @Input()
  public product: Product;

  public form: FormGroup;
  public editor = ClassicEditor;

  public categories: any[] = [];

  public selectedAttribute: any;
  public option: AttributeOption;

  ngOnInit() {
    this.cservice.getAll()
      .subscribe(
        (response: ApiResponse<any>) => {
          this.categories = response.data.data;
        }
      );

    if (this.product && this.product.id > 0) {
      this.service.get(this.product.id, '/' + 1)
        .subscribe(
          (response: ApiResponse<Product>) => {
            const data = response.data;
            this.product.attributes = data.attributes;
            this.product.images = data.images;
            this.product.category = data.category;
            this.product.description = data.description;
            this.product.price = data.price;
            this.product.name = data.name;
            this.product.slug = data.slug;

            this.product.attributes = (this.product.attributes || []).map(attr => {
              attr.options = attr.options.map(option => {
                option.value = option.name;
                option.display = option.name;
                return option;
              });
              return attr;
            });
          },
          (error: Error) => {
            alert(error.message);
          }
        );
    }
  }

  setSlug(product: any) {
    if (!product || !product.name) {
      return;
    }
    product.slug = new SlugPipe().transform(product.name);
  }


  public optionClicked(event: any, attr: any, attrIndex: number) {
    let index = -1;
    for (const i in attr.options) {
      if (attr.options[i].value === event.value) {
        index = parseInt(i, 10);
        break;
      }
    }
    if (index === -1) {
      return false;
    }

    this.selectedAttribute = attr;
    this.option = new AttributeOption(attr, index, attrIndex);
  }

  public optionSave(data: any) {
    delete this.option;

    if (!data) {
      return;
    }

    const option: AttributeOption = data.option;
    const optionIndex = option.getIndex();

    this.selectedAttribute.options[optionIndex] = option.makeValues();
    delete this.selectedAttribute;
  }

  public removeImage(index: number) {
    this.product.images.splice(index, 1);
  }

  public multipleImages(images: Array<string>) {
    const imgs = (images || []).map(img => {
      return {name: img};
    });

    this.product.images = (this.product.images || []).concat(imgs);
  }

  public byCategory(cat1: any, cat2: any): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

  public clearForm(): void {
    this.form.reset();
  }

}
