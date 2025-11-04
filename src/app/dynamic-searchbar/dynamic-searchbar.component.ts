import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter, from, fromEvent, map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-dynamic-searchbar',
  templateUrl: './dynamic-searchbar.component.html',
  styleUrls: ['./dynamic-searchbar.component.scss']
})
export class DynamicSearchbarComponent {


  searchform: FormGroup | any;

  users = ['priya', 'sasi','priyanka','sasikala','priyadarshani','sasikala priyadarshani','priyadarshani sasikala','priyadarshani sasi','priyadarshani priyanka sasikala sasi'];

  filteredUsers$!: Observable<string[]>;

  names$ = new Observable(observer => {
    observer.next('priya');
    observer.next('abc');
    observer.next('def');
  });

  @ViewChild('user')userInput!: ElementRef;

  constructor(private fb: FormBuilder){

  }

  get f(){
    return this.searchform.controls;
  }

  ngOnInit() {
    this.createform();

    this.filteredUsers$ = this.searchform.get('searchControl').valueChanges.pipe(
      startWith(''), // Start with empty input
      map((userdata: string) => this.filterUsers(userdata || ''))
    );

  this.names$.subscribe(value => console.log(value)); 

  }
  ngAfterViewInit() {
    fromEvent(this.userInput.nativeElement, 'input').pipe(
      debounceTime(100),
      map((event: any) => (event.target as HTMLInputElement).value)
    ).subscribe(value => console.log('User Input:', value));
  }
  private filterUsers(searchText: string): string[] {
    searchText = searchText.toLowerCase();
    return this.users.filter(user => user.toLowerCase().includes(searchText));
  }

  createform(){
    this.searchform = this.fb.group({
      searchControl: ['']
    })
  }

  submit(){
    console.log(this.searchform.value);
  }



  convert(){  // Converting Array to Observable
    const userarray$ = from(['Angular','React','Data Engineering','Data Science','Machine Learning','Deep Learning']); 
    console.log(userarray$.subscribe(val => console.log(val)));
  }

  evennumbers(){
    const even$ = of(1,2,3,4,5,6,7,8,9,10).pipe(
      // filter((num: any) => num % 2 === 0)).subscribe((val: any) => console.log(val)
      map((num: any) => num*10)).subscribe((val: any) => console.log(val)
    );
  }

 
}
