import {NotFoundError} from '../../../shared/not-found-error';
import {AppError} from '../../../shared/app-error';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  private id;
  public modifier = 'ADD';
  public form: FormGroup;

  public data: any = {
    id: '',
    name: ''
  };

  constructor(private service: CategoryService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      this.modifier = 'EDIT';
      this.service.get(this.id)
        .subscribe(
          response => {
            console.log(response);
            this.data = response['data'];
          },
          (error: AppError) => {
            if (error instanceof NotFoundError) {
              alert('Category has already been deleted');
            } else {
              throw error;
            }
          }
        );
    }
  }

  public submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.markAllAsTouched();
    if (this.id) {
      this.service.update(this.form.value)
        .subscribe(
          response => {
            console.log(response);
            alert('Successfully updated');
            this.router.navigate(['/products']);
          }
        );
    } else {
      this.service.create({
        name: this.form.get('name').value
      })
        .subscribe(
          response => {
            console.log(response);
            alert('Successfully created');
            this.router.navigate(['/categories']);
          }
        );
    }

  }

  public clearForm(): void {
    this.form.reset();
  }

}
