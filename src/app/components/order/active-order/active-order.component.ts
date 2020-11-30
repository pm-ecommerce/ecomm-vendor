import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { OrderService } from '../../../services/order.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { ModalService } from '../../../services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../shared/api-response';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../../services/login.service";

@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.scss']
})
export class ActiveOrderComponent implements OnInit {

  @ViewChild(DataBindingDirective, { static: true })
  public dataBinding: DataBindingDirective;

  @ViewChild('details', { static: true })
  public details: TemplateRef<any>;

  public gridData: any;

  public vendorId: any;

  public sort: SortDescriptor[] = [
    {
      field: 'order_id',
      dir: 'desc'
    },
    {
      field: 'user_id',
      dir: 'asc'
    }
  ];
  public gridView: any;
  public state: State = {
    skip: 0
  };

  public order: any = {};
  public pageType: string;

  constructor(private service: OrderService, private modal: ModalService, private route: ActivatedRoute, private toastr: ToastrService, private authService: AuthService) {
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
      this.loadOrders();
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public updateOrderStatus(order) {
    const statusMap = {
      1: 'IN_PROGRESS',
      2: 'SHIPPED',
      3: 'DELIVERED',
      4: 'CANCELLED',
    };

    const subscription$ = this.service.updateOrderStatus(order).subscribe((res: any) => {
      if (res.status === 200) {
        order.status = statusMap[order.statusId];
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      subscription$.unsubscribe();
    }, err => {
      this.toastr.error(err.message || 'An unknown error occurred. Please trt again');
      subscription$.unsubscribe();
    });
  }

  public loadOrders(page = 1) {
    const statusMap = {
      RECEIVED: 0,
      IN_PROGRESS: 1,
      SHIPPED: 2,
      DELIVERED: 3,
      CANCELLED: 4,
    };
    const url = `?page=${page}`;
    const active = !this.pageType;
    this.service.getOrders(this.vendorId, active, url).subscribe((response: ApiResponse<any>) => {
      this.gridData.data = response.data.data.map(order => {
        order.statusId = statusMap[order.status];
        return order;
      });
    });
    this.gridView = this.gridData;
  }

  public viewOrderItems(order = {}) {
    this.order = order;
    this.modal.open(this.details, 'lg');
  }

  getOrderTotal(order: any = {}) {
    const total = (order.items || []).reduce((sum, row) => sum + row.rate * row.quantity, 0);
    return total + (total * 0.07);
  }

  public close() {
    this.modal.close();
  }

  ngOnInit() {
  }

}
