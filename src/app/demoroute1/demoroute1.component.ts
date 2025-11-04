import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, startWith, of } from 'rxjs';

@Component({
  selector: 'app-demoroute1',
  templateUrl: './demoroute1.component.html',
  styleUrls: ['./demoroute1.component.scss']
})
export class Demoroute1Component {

  addform: FormGroup  | any;
  lowercaseversion: any;
  uppercaseversion: any;
  userinput: string = '';
  upper: boolean = false;

  searchControl = new FormControl();
  resultArr: string[] =[];

  private data = ['Angular','React','Vue JS','JS','Next js','Nuxt js','Reactive native','Angular Native','Vue native'];

  private allOptions = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

  /**
   *
   */
  constructor(private router: Router, private fb: FormBuilder) {
    this.searchControl
    .valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(query => this.search(query))).subscribe(resultArr => this.resultArr = resultArr);

      this.searchControl.valueChanges.pipe(
        startWith(''), // Show all options initially
        debounceTime(300), // Delay to prevent excessive function calls
        distinctUntilChanged(),
        switchMap(value => this.filterOptions(value))
      ).subscribe(filteredResults => this.resultArr = filteredResults);
  }

  search(query:string){
    if(!query){
      return of([]);
    }
    return of(this.data.filter(item => item.toLowerCase().includes(query)));
  }

  filterOptions(query: string) {
    if (!query) return of(this.allOptions); // Show all if no input
    return of(this.allOptions.filter(option => option.toLowerCase().includes(query.toLowerCase())));
  }

  ngOnInit() {
    this.createform();
  }


  createform(){
    this.addform = this.fb.group({
      name: new FormControl('')
    })
  }
  back() {
    this.router.navigate(['../angpractice']);
  }

  onSubmit() {
    console.log(this.addform.value);
    const inputvalue = this.addform.get('name')?.value;
    this.lowercaseversion = inputvalue.toLowerCase().split(' ').join('_');

 
  }
  converuppercase(){
    console.log(this.addform.value);
      const inputvalue = this.addform.get('name')?.value;
      this.uppercaseversion = inputvalue.toUpperCase().split('').join('_');
  }

  tdfsubmit(){
    this.userinput = this.userinput.toLowerCase().split(' ').join('_');
  }
}
