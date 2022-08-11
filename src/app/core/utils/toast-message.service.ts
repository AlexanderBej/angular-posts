import { Injectable } from "@angular/core";
import { ToastService } from "../services/toast.service";

@Injectable({
    providedIn: 'root'
})
export class ToastMessageService {

    constructor(private toastService: ToastService) { }

    public showSuccess(message: string): void {
        this.toastService.show(message, { classname: 'custom-toast custom-success', delay: 4000 })
    }

    public showError(message: string): void {
        this.toastService.show(message, { classname: 'custom-toast custom-error', delay: 4000 })
    }
}