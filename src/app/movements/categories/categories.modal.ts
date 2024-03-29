import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from './category.model';
import { Subscription } from 'rxjs';
import { MovementsService } from '../movements.service';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.modal.html',
  styleUrls: ['./categories.modal.scss']
})
export class CategoriesModal implements OnInit, OnDestroy {
  private categoriesSub: Subscription;
  isLoading = false;

  categories: Category[] = [];

  constructor(private movementsService: MovementsService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.isLoading = true;
    this.categoriesSub = this.movementsService.categories.subscribe(categories => {
      this.categories = _.sortBy(categories, 'name');
      this.isLoading = false;
    });
  }

  onCategoryPick(category: Category) {
    this.modalCtrl.dismiss(
      {
        categoryData: {
          pickedCategory: category
        }
      },
      'confirm'
    );
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.movementsService.getMovementCategories().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnDestroy() {
    if (this.categories) {
      this.categoriesSub.unsubscribe();
    }
  }
}
