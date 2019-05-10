import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovementDetail } from '../movement-detail';
import { MovementsService } from '../movements.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Movement } from '../movement.model';

@Component({
  selector: 'app-edit-movement',
  templateUrl: './edit-movement.page.html',
  styleUrls: ['./edit-movement.page.scss']
})
export class EditMovementPage extends MovementDetail
  implements OnInit, OnDestroy {

    movementDate: string;
    movementType: string;
    isLoading = false;
    private movementSub: Subscription;

  constructor(
    protected movementsService: MovementsService,
    protected router: Router,
    protected loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    super(movementsService, router, loadingCtrl);
    console.log('child constructor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('movementId')) {
        this.navCtrl.navigateBack('/movements');
        return;
      }
      this.isLoading = true;
      this.movementSub = this.movementsService
        .getMovement(paramMap.get('movementId'))
        .subscribe(
          movement => {
            this.setFormValues(movement);
            this.isLoading = false;
          },
          error => {
            this.alertCtrl.create({
              header: 'An error ocurred!',
              message: 'Could not load movement.',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.router.navigate(['/movements']);
                  }
                }
              ]
            }).then(alertElement => {
              alertElement.present();
            });
          }
        );
    });
    super.ngOnInit();
    console.log('child init');
}

setFormValues(movement: Movement) {
  this.form.get('type').setValue(movement.isExpense ? 'expense' : 'income');
  this.form.get('description').setValue(movement.description);
  this.form.get('value').setValue(movement.value);
  this.form.get('date').setValue(movement.date.toISOString());
}

  onEditMovement() {
    if (!this.form.valid) {
      console.log('not valid');
    }
  }

  ngOnDestroy(): void {
    if (this.movementSub) {
      this.movementSub.unsubscribe();
    }
  }
}
