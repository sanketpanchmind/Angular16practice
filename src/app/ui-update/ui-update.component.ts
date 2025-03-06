import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-update',
  templateUrl: './ui-update.component.html',
  styleUrls: ['./ui-update.component.scss']
})
export class UiUpdateComponent {

  leftuiupdate: FormGroup | any;
  rightform: FormGroup | any;
  showinventoryflag: boolean = false;

  checktype: any[] = [
    { id: 1, value: "Sold" },
    { id: 2, value: "Purchase" },
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createleftform();
  }

  createleftform() {
    this.leftuiupdate = this.fb.group({
      producttype: new FormControl(),
      category: new FormControl(),
      name: new FormControl(),
      checktype: new FormControl(),
      checktype2: new FormControl()
    });

    this.rightform = this.fb.group({
      category: new FormControl('', [Validators.required]),
      checktype: new FormControl('', [Validators.required]),
      inventoryname: new FormControl('', [Validators.required]),
      inventorytype: new FormControl('', [Validators.required])
    })
  }

  leftformSubmit() {
    console.log(this.leftuiupdate.value);
  }

  rightForm() {
    if (this.rightform.invalid) {
      console.log("error")
    }
    else {

      console.log(this.rightform.value);
    }
  }

  showinventoryform() {
    this.showinventoryflag = true;
  }

  onInventorynamechange(event: any) {
    console.log(event.target.value);
  }

  ontypechange(event: any) {
    console.log(event.target.value);
  }
}
