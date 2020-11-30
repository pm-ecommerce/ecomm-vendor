import { ApiResponse } from './../../../shared/api-response';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/category.service';
import { NotFoundError } from './../../../shared/not-found-error';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;

  constructor(private service: CategoryService, private toastr: ToastrService) { }
  public onFilter(inputValue: string): void {
    this.gridData = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'name',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

  public gridData: any[] = [
    {
      id: '',
      vendor: {
        id: '',
        name: ''
      },
      name: '',
      isDeleted: ''
    }
  ];
  public gridView: any[];

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        (response) => {
          console.log(response);
          this.gridData = response['data'];
          //this.gridView = this.gridData;
        }
      );
    this.gridView = this.gridData;
  }

  deleteCategory(id) {
    alert(id);
    this.service.delete(id)
      .subscribe(
        (response: ApiResponse<any>) => {
          if (response.status === 200)
            this.toastr.success(response.message);
          else
            this.toastr.error(response.message || 'An Unexpected error occured');
        },
        (error: ApiResponse<any>) => {
          this.toastr.error(error.message || 'An Unexpected error occured');
        }
      )
  }

}
