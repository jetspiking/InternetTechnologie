import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Cpu } from '../cpu';
import { CpuService } from '../cpu.service';

@Component({
  selector: 'app-cpu-search',
  templateUrl: './cpu-search.component.html',
  styleUrls: [ './cpu-search.component.scss' ]
})
export class CpuSearchComponent implements OnInit {
  cpus$: Observable<Cpu[]>;
  private searchTerms = new Subject<string>();

  constructor(private cpuService: CpuService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cpus$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cpuService.searchCpus(term)),
    );
  }
}