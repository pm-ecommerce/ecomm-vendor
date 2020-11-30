import {ProductServiceService} from '../../../services/product-service.service';
import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {DataBindingDirective} from '@progress/kendo-angular-grid';
import {orderBy, SortDescriptor, State} from '@progress/kendo-data-query';
import {ApiResponse} from '../../../shared/api-response';
import {ModalService} from '../../../services/modal.service';
import {Product} from '../../../entities/product';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/login.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @ViewChild(DataBindingDirective, {static: true})
  public dataBinding: DataBindingDirective;

  @ViewChild('form', {static: true})
  public form: TemplateRef<any>;

  public gridData: any;

  public vendorId: any;

  public sort: SortDescriptor[] = [
    {
      field: 'name',
      dir: 'asc'
    }
  ];
  public gridView: any;
  public state: State = {
    skip: 0
  };

  public product: any = {};
  public pageType: string;

  constructor(private service: ProductServiceService, private toastr: ToastrService, private authService: AuthService, private modal: ModalService, private route: ActivatedRoute) {
    this.gridView = {
      skip: 0,
      pageSize: 15,
      row: 30,
      height: 740,
      scroll: 'virtual',
      sortable: {
        allowUnsort: true,
        multiple: false
      }
    };

    this.gridData = {
      data: []
    };

    this.vendorId = this.authService.getCurrentUser().id;

    this.route.params.subscribe(params => {
      this.pageType = params.type;
      this.loadProducts();
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public loadProducts(page = 1) {
    let url = `/${this.vendorId}`;
    if (this.pageType) {
      if (this.pageType === 'pending-approval') {
        url += '/status/WAITING_APPROVAL';
      }
      if (this.pageType === 'disapproved') {
        url += '/status/UNAPPROVED';
      }
    }

    url += `?page=${page}`;

    this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<any>) => {
          if (response.status === 200) {
            this.gridData = response.data;
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error: ApiResponse<any>) => {
          this.toastr.error(error.message || 'An unknown error occurred. Please try again.');
        }
      );
    // this.gridView = this.gridData;
  }

  public ngOnInit(): void {
  }

  sendForApproval(item) {
    const subscription$ = this.service.patch(`/${this.vendorId}/${item.id}/send-for-approval`)
      .subscribe(
        (response: ApiResponse<Product>) => {
          if (response.status === 200) {
            item.status = response.data.status;
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
          subscription$.unsubscribe();
        },
        (err) => {
          subscription$.unsubscribe();
          this.toastr.error(err.message || 'An unknown error occurred. Please try again.');
        }
      );
  }

  productForm(product: Product = {} as Product) {
    this.product = new Product(product);
    this.modal.open(this.form, 'modal-lg');
    console.log(this.product);
  }

  public close() {
    this.modal.close();
  }


  public clone(item): any {
    this.service.get(item.id, '/' + 1).subscribe((response: any) => {
      const data = response.data;
      const product = JSON.parse(JSON.stringify(data));
      delete product.id;
      if (product.images && product.images.length > 0) {
        product.images.forEach(image => {
          delete image.id;
        });
      }
      if (product.attributes && product.attributes.length > 0) {
        product.attributes.forEach(attribute => {
          delete attribute.id;
          attribute.options.forEach(option => {
            option.value = option.name;
            option.display = option.name;
            delete option.id;
          });
        });
      }

      this.product = product;
      this.modal.open(this.form, 'modal-lg');
    });
  }

  public save() {
    this.product.attributes = this.product.attributes.map(attr => {
      attr.options = attr.options.map(option => {
        if (!option.name) {
          option.name = option.value || option.display;
        }
        return option;
      });
      return attr;
    });

    // Damage control
    if (this.product.category) {
      delete this.product.category.image;
    }

    if (this.product.id > 0) {
      const subscription$ = this.service.update(this.product, '/' + this.vendorId).subscribe(
        (response: ApiResponse<Product>) => {
          subscription$.unsubscribe();
          if (response.status === 200) {
            this.gridData.data = this.gridData.data.map(data => {
              if (data.id === this.product.id) {
                return response.data;
              }
              return data;
            });
            this.close();
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error: ApiResponse<Product>) => {
          subscription$.unsubscribe();
          this.toastr.error(error.message || 'An unknown error occurred. Please try again.');
        }
      );
    } else {
      console.log(this.product);
      const subscription$ = this.service.create(this.product, '/' + this.vendorId).subscribe(
        (response: ApiResponse<Product>) => {
          subscription$.unsubscribe();
          if (response.status === 200) {
            this.gridData.data.push(response.data);
            this.close();
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error: ApiResponse<Product>) => {
          subscription$.unsubscribe();
          this.toastr.error(error.message || 'An unknown error occurred. Please try again.');
        }
      );
    }
  }

  deleteProduct(product: Product) {
    const subscription$ = this.service.delete(`/${this.vendorId}/${product.id}`)
      .subscribe(
        (response: ApiResponse<Product>) => {
          subscription$.unsubscribe();
          if (response.status === 200) {
            this.gridData.data = this.gridData.data.filter(data => data.id !== product.id);
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error: ApiResponse<Product>) => {
          subscription$.unsubscribe();
          this.toastr.error(error.message || 'An unknown error occurred. Please try again.');
        }
      );
  }
}
