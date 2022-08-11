import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-toast',
  templateUrl: './post-toast.component.html',
  styleUrls: ['./post-toast.component.scss']
})
export class PostToastComponent {

  constructor(public toastService: ToastService) { }

  public isTemplate(toast: { textOrTpl: any; }): boolean { 
    return toast.textOrTpl instanceof TemplateRef
  }

}
