import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule,  } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let mockRouter: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [HomeComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        mockRouter = TestBed.inject(Router);
    });

    describe('addNewPost', () => {
        it('Should navigate to /add on add button', () => {
            component.addNewPost();
            fixture.whenStable().then(() => {
                expect(mockRouter.navigate).toHaveBeenCalledWith(['add']);
            })
        });
    });
});