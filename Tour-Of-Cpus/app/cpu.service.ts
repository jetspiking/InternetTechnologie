import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cpu } from './cpu';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CpuService {

  private cpusUrl = 'api/cpus';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getCpus(): Observable<Cpu[]> {
    return this.http.get<Cpu[]>(this.cpusUrl)
      .pipe(
        tap(_ => this.log('fetched cpus')),
        catchError(this.handleError<Cpu[]>('getCpus', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCpuNo404<Data>(id: number): Observable<Cpu> {
    const url = `${this.cpusUrl}/?id=${id}`;
    return this.http.get<Cpu[]>(url)
      .pipe(
        map(cpus => cpus[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} cpu id=${id}`);
        }),
        catchError(this.handleError<Cpu>(`getCpu id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCpu(id: number): Observable<Cpu> {
    const url = `${this.cpusUrl}/${id}`;
    return this.http.get<Cpu>(url).pipe(
      tap(_ => this.log(`fetched cpu id=${id}`)),
      catchError(this.handleError<Cpu>(`getCpu id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchCpus(term: string): Observable<Cpu[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Cpu[]>(`${this.cpusUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Cpu[]>('searchCpus', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCpu(cpu: Cpu): Observable<Cpu> {
    return this.http.post<Cpu>(this.cpusUrl, cpu, this.httpOptions).pipe(
      tap((newCpu: Cpu) => this.log(`added cpu w/ id=${newCpu.id}`)),
      catchError(this.handleError<Cpu>('addCpu'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCpu(id: number): Observable<Cpu> {
    const url = `${this.cpusUrl}/${id}`;

    return this.http.delete<Cpu>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted cpu id=${id}`)),
      catchError(this.handleError<Cpu>('deleteCpu'))
    );
  }

  /** PUT: update the hero on the server */
  updateCpu(cpu: Cpu): Observable<any> {
    return this.http.put(this.cpusUrl, cpu, this.httpOptions).pipe(
      tap(_ => this.log(`updated cpu id=${cpu.id}`)),
      catchError(this.handleError<any>('updateCpu'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CpuService: ${message}`);
  }
}