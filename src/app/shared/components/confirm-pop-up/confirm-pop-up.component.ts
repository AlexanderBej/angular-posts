import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-pop-up',
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.scss']
})
export class ConfirmPopUpComponent {

  @Input() message = "";

  constructor(private activeModal: NgbActiveModal) { }


  public cancel(): void {
    this.activeModal.close(false);
  }

  public  confirm(): void {
    this.activeModal.close(true);
  }

}
