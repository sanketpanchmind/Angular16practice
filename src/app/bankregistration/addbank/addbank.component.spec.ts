import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankComponent } from './addbank.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BankregisterService } from 'src/app/service/bankregister.service';
import { of } from 'rxjs';


describe('AddbankComponent', () => {
  let component: AddbankComponent;
  let fixture: ComponentFixture<AddbankComponent>;
  let service: BankregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbankComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AddbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have 2 controls", () => {
    expect(component.addbankform.contains('organization')).toBeTrue();
    expect(component.addbankform.contains('bankname')).toBeTrue();
  });

  it("should have organization required", () => {
    const control = component.addbankform.get('organization');
    control.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('Org AB');
    expect(control?.valid).toBeTrue();
  });

  it("should have bank name required", () => {
    const control = component.addbankform.get('bankname');
    control?.setValue('');
    expect(control.valid).toBeFalse();

    control?.setValue('HDFC Bank');
    expect(control.valid).toBeTrue();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [BankregisterService] // provide the service
    }).compileComponents();

    service = TestBed.inject(BankregisterService);
  });

  it("should call submit bank service", () => {
    spyOn(service, 'registernewBank').and.returnValue(of({ sucess: true }));

    component.addbankform.setValue({ organization: 1, bankname: 'BBC' });
    component.submitnewbank();

    expect(service.registernewBank).toHaveBeenCalledWith(1, 'BBC');

  })


});
