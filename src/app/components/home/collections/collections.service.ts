import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Collections } from './collections.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private collection: Collections[] = [];
  private collectionSubject = new Subject<Collections[]>();

  constructor(private http: HttpClient) { }

  getCollectionsUpdatedListener() {
    return this.collectionSubject.asObservable();
  }

  generateCollegeCollections(collegeId, fromAcId, toAcId, fromFnId, toFnId) {
    const url = BACKEND_URL + '/collection?' +
    'collegeId=' + collegeId + '&fromAcId=' + fromAcId + '&toAcId=' + toAcId + '&fromFnId=' + fromFnId + '&toFnId=' + toFnId;
    this.http.get<{message: string; collections: any}>(url)
      .pipe(map((collection) => {
        return collection.collections.map(coll => {
          return {
            college_name: coll.college_name,
            income_head: coll.income_head,
            fee: parseFloat(coll.fee),
            ac_year: coll.academic_year,
            fn_year: coll.financial_year,
            student_count: parseFloat(coll.student_count),
            receipt_no: coll.receipt_no,
            receipt_date: coll.receipt_enclosed_date
          };
        });
      }))
      .subscribe((coll) => {
        this.collection = coll;
        this.collectionSubject.next([...this.collection]);
      });
  }

  generateDistrictCollection(distId, fromAcId, toAcId, fromFnId, toFnId) {
    const url = BACKEND_URL + '/collection?' +
    'distId=' + distId + '&fromAcId=' + fromAcId + '&toAcId=' + toAcId + '&fromFnId=' + fromFnId + '&toFnId=' + toFnId;
    this.http.get<{message: string; collections: any}>(url)
      .pipe(map((collection) => {
        return collection.collections.map(coll => {
            return {
              college_name: coll.college_name,
              income_head: coll.income_head,
              fee: parseFloat(coll.fee),
              ac_year: coll.academic_year,
              fn_year: coll.financial_year,
              student_count: parseFloat(coll.student_count),
              received_date: coll.received_date
            };
        });
      }))
      .subscribe((coll) => {
          this.collection = coll;
          this.collectionSubject.next([...this.collection]);
      });
  }

  generateUniversityCollection(univId, fromAcId, toAcId, fromFnId, toFnId) {
    const url = BACKEND_URL + '/collection?' +
    'univId=' + univId + '&fromAcId=' + fromAcId + '&toAcId=' + toAcId + '&fromFnId=' + fromFnId + '&toFnId=' + toFnId;
    this.http.get<{message: string; collections: any}>(url)
      .pipe(map((collection) => {
        return collection.collections.map(coll => {
            return {
              college_name: coll.college_name,
              income_head: coll.income_head,
              fee: parseFloat(coll.fee),
              ac_year: coll.academic_year,
              fn_year: coll.financial_year,
              student_count: parseFloat(coll.student_count),
              received_date: coll.received_date
            };
        });
      }))
      .subscribe((coll) => {
          this.collection = coll;
          this.collectionSubject.next([...this.collection]);
      });
  }
}
