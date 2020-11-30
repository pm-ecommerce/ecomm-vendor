import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {Order} from '../../../entities/report/order';
import {OrderService} from '../../../services/order.service';
import {ReportResponse} from '../../../entities/report/report-response';
import {DataBindingDirective} from '@progress/kendo-angular-grid';
import {orderBy, SortDescriptor, State} from '@progress/kendo-data-query';
import {ModalService} from '../../../services/modal.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-in-progress-order',
  templateUrl: './in-progress-order.component.html',
  styleUrls: ['./in-progress-order.component.scss']
})
export class InProgressOrderComponent implements OnInit {

  @ViewChild(DataBindingDirective, {static: true})
  public dataBinding: DataBindingDirective;

  @ViewChild('form', {static: true})
  public form: TemplateRef<any>;

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

  constructor(private service: OrderService, private modal: ModalService, private route: ActivatedRoute) {
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

    this.vendorId = 1;

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

  public loadOrders(page = 1) {
    this.service.getOrders(this.vendorId).subscribe((response: ReportResponse<any>) => {
      const orders: Order [] = [];
      for (const o of response.data.responseData.list) {
        if (o.status === 'IN_PROGRESS') {
          orders.push(o);
        }
      }
      this.gridData.data = orders;
    });
    this.gridView = this.gridData;
  }

  ngOnInit() {
  }

}
