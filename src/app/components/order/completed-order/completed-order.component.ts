import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataBindingDirective} from '@progress/kendo-angular-grid';
import {orderBy, SortDescriptor, State} from '@progress/kendo-data-query';
import {OrderService} from '../../../services/order.service';
import {ModalService} from '../../../services/modal.service';
import {ActivatedRoute} from '@angular/router';
import {ReportResponse} from '../../../entities/report/report-response';
import {Order} from '../../../entities/report/order';
import {AuthService} from '../../../services/login.service';

@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.component.html',
  styleUrls: ['./completed-order.component.scss']
})
export class CompletedOrderComponent implements OnInit {

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

  constructor(private service: OrderService, private authService: AuthService, private modal: ModalService, private route: ActivatedRoute) {
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

  public loadOrders(page = 1) {
    this.service.getOrders(this.vendorId, false).subscribe((response: ReportResponse<any>) => {
      const orders: Order [] = [];
      for (const o of response.data.responseData.list) {
        if (o.status === 'DELIVERED') {
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
