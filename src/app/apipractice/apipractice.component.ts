import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-apipractice',
  templateUrl: './apipractice.component.html',
  styleUrls: ['./apipractice.component.scss']
})
export class ApipracticeComponent implements OnInit {

  userserviceform: FormGroup | any;
  userserviceformobj = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  };
  userList: any;
  displayStyle = "none";
  isshow = true;

  addData = false;


  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    this.userList = [];
  }

  ngOnInit(): void {
    this.createform();
    this.getuserlist();
  }

  createform() {
    this.userserviceform = this.fb.group({
      name: new FormControl(),
      designation: new FormControl(),
      contact: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
    });
  }

  addNewData() {
    this.addData = true;
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  // this api will return a response and to catch that response we will use subscribe method.
  getuserlist() {
    this.httpClient.get('https://localhost:7234/api/Employee').subscribe((res: any) => {
      this.userList = res;
      console.log(this.userList);
    })
  }

  saveuser() {
    if (this.userserviceform.valid) {
      const formData = this.userserviceform.value; // Get form values
      console.log('Sending Form Data:', formData); // Log form data

      this.httpClient.post('https://localhost:7234/api/Employee', formData).subscribe((res: any) => {
        console.log(res);
        this.userserviceformobj = formData;
        this.userList.push(this.userserviceformobj);
        console.log("user saved successfully");
      });
      this.addNewData();

      // this.httpClient.post('https://localhost:7234/api/Employee', formData).subscribe(
      //   (res: any) => {
      //     console.log("User saved successfully:", res);
      //     this.userserviceformobj = formData; // Update object
      //     this.userList.push(formData); // Update list
      //     console.log("Updated User List:", this.userList);
      //     alert("Data saved successfully!!!");

      //     // Reset the form
      //     this.userserviceform.reset();
      //   },
      //   (error) => {
      //     console.error("Error saving user:", error);
      //     alert("Failed to save user data.");
      //   }
      // );


    }
    else {
      alert('Please fill all required fields correctly.');
    }

  }

  editrecord(user: number) {
    if (this.userserviceform.valid) {

      console.log("on btn click user - ", user);
      const formdata = this.userList;

      const editurl = 'https://localhost:7234/api/Employee/UpdateEmployee?Id=' + user;

      const index =
        this.httpClient.put(editurl, formdata, { responseType: 'text' }).subscribe((res: any) => {
          this.createform();
          this.userserviceformobj = formdata;
          this.userList.push(this.userserviceformobj);

          console.log("data edited ");
        })
    }
    else {
      console.log("ERROR");
    }

  }

  deleterecord(user: number) {
    // const url = `https://localhost:7234/api/Employee/DeleteRec/${user}`;

    // console.log(user);
    // debugger;
    // this.httpClient.delete(url).subscribe((res: any) => {
    //   console.log("Response", res);
    //   console.log('deleted');
    // })


    const url = 'https://localhost:7234/api/Employee/DeleteRec?Id=' + user;

    console.log('Request URL:', url);
    console.log('User Value:', user);

    this.httpClient.delete(url, { responseType: 'text' }).subscribe(
      (res: any) => {
        console.log('Response:', res); // Expect an empty or valid response
        console.log('User deleted successfully.');
      },
      (error) => {
        console.error('Error deleting user:', error); // Log any error
        alert('Failed to delete user. Check console for details.');
      }
    );


  }

}
