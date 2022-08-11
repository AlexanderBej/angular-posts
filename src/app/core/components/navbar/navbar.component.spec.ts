import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let mockRouter: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [NavbarComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        mockRouter = TestBed.inject(Router);
    });

    describe('goHome', () => {
        it('Should navigate to /home on logo', () => {
            component.goHome();
            fixture.whenStable().then(() => {
                expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
            })
        });
    });
});
