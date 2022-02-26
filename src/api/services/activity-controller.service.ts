/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ActivityEntity } from '../models/activity-entity';
import { AnalyticsEntry } from '../models/analytics-entry';
import { ResourceActivityEntity } from '../models/resource-activity-entity';
import { StringPrimitive } from '../models/string-primitive';
import { ImageEntity } from '../models/image-entity';
import { ResourcesObject } from '../models/resources-object';
import { ScheduleEntity } from '../models/schedule-entity';

/**
 * Activity Controller
 */
@Injectable({
  providedIn: 'root',
})
class ActivityControllerService extends __BaseService {
  static readonly activityControllerReadAllPath = '/activities';
  static readonly activityControllerCreatePath = '/activities';
  static readonly activityControllerCalculateActivitiesPerCategoryPath = '/activities/analytics/categories';
  static readonly activityControllerCalculateActivitiesPerSuburbsPath = '/activities/analytics/suburbs';
  static readonly activityControllerCalculateActivitiesPerTargetGroupPath = '/activities/analytics/targetgroups';
  static readonly activityControllerCalculateOverviewVisitorsPath = '/activities/visitors';
  static readonly activityControllerCalculateOverviewVisitsPath = '/activities/visits';
  static readonly activityControllerReadOnePath = '/activities/{activityId}';
  static readonly activityControllerUpdatePath = '/activities/{activityId}';
  static readonly activityControllerDeletePath = '/activities/{activityId}';
  static readonly activityControllerReadAddressPath = '/activities/{activityId}/address';
  static readonly activityControllerUpdateAddressPath = '/activities/{activityId}/address';
  static readonly activityControllerReadCategoryPath = '/activities/{activityId}/category';
  static readonly activityControllerUpdateCategoryPath = '/activities/{activityId}/category';
  static readonly activityControllerGenerateAllIcalPath = '/activities/{activityId}/iCal';
  static readonly activityControllerReadImagesPath = '/activities/{activityId}/images';
  static readonly activityControllerAddImagePath = '/activities/{activityId}/images';
  static readonly activityControllerDeleteImagesPath = '/activities/{activityId}/images';
  static readonly activityControllerIncreaseLikePath = '/activities/{activityId}/like';
  static readonly activityControllerReadOrganisationPath = '/activities/{activityId}/organisation';
  static readonly activityControllerUpdateOrganisationPath = '/activities/{activityId}/organisation';
  static readonly activityControllerReadSchedulesPath = '/activities/{activityId}/schedules';
  static readonly activityControllerAddSchedulesPath = '/activities/{activityId}/schedules';
  static readonly activityControllerDeleteSchedulesPath = '/activities/{activityId}/schedules';
  static readonly activityControllerReadTargetGroupsPath = '/activities/{activityId}/targetgroups';
  static readonly activityControllerAddTargetGroupsPath = '/activities/{activityId}/targetgroups';
  static readonly activityControllerDeleteTargetGroupsPath = '/activities/{activityId}/targetgroups';
  static readonly activityControllerReadTitleImagePath = '/activities/{activityId}/titleImage';
  static readonly activityControllerAddTitleImagePath = '/activities/{activityId}/titleImage';
  static readonly activityControllerReadTranslationsPath = '/activities/{activityId}/translations';
  static readonly activityControllerCalculateVisitorsPath = '/activities/{activityId}/visitors';
  static readonly activityControllerCalculateVisitsPath = '/activities/{activityId}/visits';
  static readonly activityControllerGenerateIcalPath = '/activities/{activityId}/{scheduleId}/iCal';
  static readonly activityControllerDeleteTitleImagePath = '/activity/{activityId}/titleImage';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `ActivityControllerService.ActivityControllerReadAllParams` containing the following parameters:
   *
   * - `categories`:
   *
   * - `suburbs`:
   *
   * - `targetgroups`:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * - `current`:
   *
   * - `startDate`:
   *
   * - `endDate`:
   *
   * @return OK
   */
  activityControllerReadAllResponse(params: ActivityControllerService.ActivityControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.categories || []).forEach(val => {if (val != null) __params = __params.append('categories', val.toString())});
    (params.suburbs || []).forEach(val => {if (val != null) __params = __params.append('suburbs', val.toString())});
    (params.targetgroups || []).forEach(val => {if (val != null) __params = __params.append('targetgroups', val.toString())});
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    if (params.current != null) __params = __params.set('current', params.current.toString());
    if (params.startDate != null) __params = __params.set('startDate', params.startDate.toString());
    if (params.endDate != null) __params = __params.set('endDate', params.endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAll
   * @param params The `ActivityControllerService.ActivityControllerReadAllParams` containing the following parameters:
   *
   * - `categories`:
   *
   * - `suburbs`:
   *
   * - `targetgroups`:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * - `current`:
   *
   * - `startDate`:
   *
   * - `endDate`:
   *
   * @return OK
   */
  activityControllerReadAll(params: ActivityControllerService.ActivityControllerReadAllParams): __Observable<{}> {
    return this.activityControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerCreateResponse(newActivity: ActivityEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * create
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerCreate(newActivity: ActivityEntity): __Observable<{}> {
    return this.activityControllerCreateResponse(newActivity).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateActivitiesPerCategory
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerCategoryResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/analytics/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerCategory
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerCategory(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.activityControllerCalculateActivitiesPerCategoryResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateActivitiesPerSuburbs
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerSuburbsResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/analytics/suburbs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerSuburbs
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerSuburbs(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.activityControllerCalculateActivitiesPerSuburbsResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateActivitiesPerTargetGroup
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerTargetGroupResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/analytics/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerTargetGroup
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerTargetGroup(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.activityControllerCalculateActivitiesPerTargetGroupResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateOverviewVisitors
   * @return OK
   */
  activityControllerCalculateOverviewVisitorsResponse(): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/visitors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * calculateOverviewVisitors
   * @return OK
   */
  activityControllerCalculateOverviewVisitors(): __Observable<number> {
    return this.activityControllerCalculateOverviewVisitorsResponse().pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * calculateOverviewVisits
   * @return OK
   */
  activityControllerCalculateOverviewVisitsResponse(): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/visits`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * calculateOverviewVisits
   * @return OK
   */
  activityControllerCalculateOverviewVisits(): __Observable<number> {
    return this.activityControllerCalculateOverviewVisitsResponse().pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * readOne
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOneResponse(activityId: string): __Observable<__StrictHttpResponse<ResourceActivityEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceActivityEntity>;
      })
    );
  }
  /**
   * readOne
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOne(activityId: string): __Observable<ResourceActivityEntity> {
    return this.activityControllerReadOneResponse(activityId).pipe(
      __map(_r => _r.body as ResourceActivityEntity)
    );
  }

  /**
   * update
   * @param newActivity newActivity
   * @param activityId activityId
   * @return OK
   */
  activityControllerUpdateResponse(newActivity: ActivityEntity,
    activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * update
   * @param newActivity newActivity
   * @param activityId activityId
   * @return OK
   */
  activityControllerUpdate(newActivity: ActivityEntity,
    activityId: string): __Observable<{}> {
    return this.activityControllerUpdateResponse(newActivity, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param activityId activityId
   * @return OK
   */
  activityControllerDeleteResponse(activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * delete
   * @param activityId activityId
   * @return OK
   */
  activityControllerDelete(activityId: string): __Observable<{}> {
    return this.activityControllerDeleteResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readAddress
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadAddressResponse(activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/address`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAddress
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadAddress(activityId: string): __Observable<{}> {
    return this.activityControllerReadAddressResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateAddress
   * @param activityId activityId
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddressResponse(activityId: string,
    addressId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/address`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * updateAddress
   * @param activityId activityId
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddress(activityId: string,
    addressId: StringPrimitive): __Observable<{}> {
    return this.activityControllerUpdateAddressResponse(activityId, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readCategory
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadCategoryResponse(activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readCategory
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadCategory(activityId: string): __Observable<{}> {
    return this.activityControllerReadCategoryResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateCategory
   * @param activityId activityId
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategoryResponse(activityId: string,
    categoryId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = categoryId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * updateCategory
   * @param activityId activityId
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategory(activityId: string,
    categoryId: StringPrimitive): __Observable<{}> {
    return this.activityControllerUpdateCategoryResponse(activityId, categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * generateAllIcal
   * @param activityId activityId
   * @return OK
   */
  activityControllerGenerateAllIcalResponse(activityId: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/iCal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * generateAllIcal
   * @param activityId activityId
   * @return OK
   */
  activityControllerGenerateAllIcal(activityId: string): __Observable<string> {
    return this.activityControllerGenerateAllIcalResponse(activityId).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * readImages
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadImagesResponse(activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/images`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readImages
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadImages(activityId: string): __Observable<{}> {
    return this.activityControllerReadImagesResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addImage
   * @param activityId activityId
   * @param images images
   * @return OK
   */
  activityControllerAddImageResponse(activityId: string,
    images: Array<ImageEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = images;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/images`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * addImage
   * @param activityId activityId
   * @param images images
   * @return OK
   */
  activityControllerAddImage(activityId: string,
    images: Array<ImageEntity>): __Observable<{}> {
    return this.activityControllerAddImageResponse(activityId, images).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteImages
   * @param activityId activityId
   * @param imageIds imageIds
   * @return OK
   */
  activityControllerDeleteImagesResponse(activityId: string,
    imageIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (imageIds || []).forEach(val => {if (val != null) __params = __params.append('imageIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/images`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * deleteImages
   * @param activityId activityId
   * @param imageIds imageIds
   * @return OK
   */
  activityControllerDeleteImages(activityId: string,
    imageIds: Array<string>): __Observable<{}> {
    return this.activityControllerDeleteImagesResponse(activityId, imageIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * increaseLike
   * @param activityId activityId
   * @param subscriptionId subscriptionId
   * @return OK
   */
  activityControllerIncreaseLikeResponse(activityId: string,
    subscriptionId?: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/like`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * increaseLike
   * @param activityId activityId
   * @param subscriptionId subscriptionId
   * @return OK
   */
  activityControllerIncreaseLike(activityId: string,
    subscriptionId?: StringPrimitive): __Observable<{}> {
    return this.activityControllerIncreaseLikeResponse(activityId, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOrganisation
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOrganisationResponse(activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/organisation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readOrganisation
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOrganisation(activityId: string): __Observable<{}> {
    return this.activityControllerReadOrganisationResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateOrganisation
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisationResponse(activityId: string,
    organisationId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/organisation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * updateOrganisation
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisation(activityId: string,
    organisationId: StringPrimitive): __Observable<{}> {
    return this.activityControllerUpdateOrganisationResponse(activityId, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readSchedules
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadSchedulesResponse(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (embeddings != null) __params = __params.set('embeddings', embeddings.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/schedules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readSchedules
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadSchedules(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.activityControllerReadSchedulesResponse(activityId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addSchedules
   * @param activityId activityId
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedulesResponse(activityId: string,
    schedules: Array<ScheduleEntity>): __Observable<__StrictHttpResponse<ResourcesObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = schedules;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/schedules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourcesObject>;
      })
    );
  }
  /**
   * addSchedules
   * @param activityId activityId
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedules(activityId: string,
    schedules: Array<ScheduleEntity>): __Observable<ResourcesObject> {
    return this.activityControllerAddSchedulesResponse(activityId, schedules).pipe(
      __map(_r => _r.body as ResourcesObject)
    );
  }

  /**
   * deleteSchedules
   * @param activityId activityId
   * @param scheduleIds scheduleIds
   * @return OK
   */
  activityControllerDeleteSchedulesResponse(activityId: string,
    scheduleIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (scheduleIds || []).forEach(val => {if (val != null) __params = __params.append('scheduleIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/schedules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * deleteSchedules
   * @param activityId activityId
   * @param scheduleIds scheduleIds
   * @return OK
   */
  activityControllerDeleteSchedules(activityId: string,
    scheduleIds: Array<string>): __Observable<{}> {
    return this.activityControllerDeleteSchedulesResponse(activityId, scheduleIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTargetGroups
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTargetGroupsResponse(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (embeddings != null) __params = __params.set('embeddings', embeddings.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readTargetGroups
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTargetGroups(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.activityControllerReadTargetGroupsResponse(activityId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addTargetGroups
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroupsResponse(activityId: string,
    targetGroupIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = targetGroupIds;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * addTargetGroups
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroups(activityId: string,
    targetGroupIds: Array<string>): __Observable<{}> {
    return this.activityControllerAddTargetGroupsResponse(activityId, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteTargetGroups
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerDeleteTargetGroupsResponse(activityId: string,
    targetGroupIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (targetGroupIds || []).forEach(val => {if (val != null) __params = __params.append('targetGroupIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * deleteTargetGroups
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerDeleteTargetGroups(activityId: string,
    targetGroupIds: Array<string>): __Observable<{}> {
    return this.activityControllerDeleteTargetGroupsResponse(activityId, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTitleImage
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadTitleImageResponse(activityId: string): __Observable<__StrictHttpResponse<ImageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/titleImage`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImageEntity>;
      })
    );
  }
  /**
   * readTitleImage
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadTitleImage(activityId: string): __Observable<ImageEntity> {
    return this.activityControllerReadTitleImageResponse(activityId).pipe(
      __map(_r => _r.body as ImageEntity)
    );
  }

  /**
   * addTitleImage
   * @param activityId activityId
   * @param titleImage titleImage
   * @return OK
   */
  activityControllerAddTitleImageResponse(activityId: string,
    titleImage: ImageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = titleImage;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/titleImage`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * addTitleImage
   * @param activityId activityId
   * @param titleImage titleImage
   * @return OK
   */
  activityControllerAddTitleImage(activityId: string,
    titleImage: ImageEntity): __Observable<{}> {
    return this.activityControllerAddTitleImageResponse(activityId, titleImage).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadTranslationsResponse(activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/translations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readTranslations
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadTranslations(activityId: string): __Observable<{}> {
    return this.activityControllerReadTranslationsResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateVisitors
   * @param activityId activityId
   * @return OK
   */
  activityControllerCalculateVisitorsResponse(activityId: string): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/visitors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * calculateVisitors
   * @param activityId activityId
   * @return OK
   */
  activityControllerCalculateVisitors(activityId: string): __Observable<number> {
    return this.activityControllerCalculateVisitorsResponse(activityId).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * calculateVisits
   * @param activityId activityId
   * @return OK
   */
  activityControllerCalculateVisitsResponse(activityId: string): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/visits`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * calculateVisits
   * @param activityId activityId
   * @return OK
   */
  activityControllerCalculateVisits(activityId: string): __Observable<number> {
    return this.activityControllerCalculateVisitsResponse(activityId).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * generateIcal
   * @param activityId activityId
   * @param scheduleId scheduleId
   * @return OK
   */
  activityControllerGenerateIcalResponse(activityId: string,
    scheduleId: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(activityId))}/${encodeURIComponent(String(scheduleId))}/iCal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * generateIcal
   * @param activityId activityId
   * @param scheduleId scheduleId
   * @return OK
   */
  activityControllerGenerateIcal(activityId: string,
    scheduleId: string): __Observable<string> {
    return this.activityControllerGenerateIcalResponse(activityId, scheduleId).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * deleteTitleImage
   * @param activityId activityId
   * @param titleimageId titleimageId
   * @return OK
   */
  activityControllerDeleteTitleImageResponse(activityId: string,
    titleimageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (titleimageId != null) __params = __params.set('titleimageId', titleimageId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activity/${encodeURIComponent(String(activityId))}/titleImage`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * deleteTitleImage
   * @param activityId activityId
   * @param titleimageId titleimageId
   * @return OK
   */
  activityControllerDeleteTitleImage(activityId: string,
    titleimageId: string): __Observable<{}> {
    return this.activityControllerDeleteTitleImageResponse(activityId, titleimageId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ActivityControllerService {

  /**
   * Parameters for activityControllerReadAll
   */
  export interface ActivityControllerReadAllParams {
    categories?: Array<string>;
    suburbs?: Array<string>;
    targetgroups?: Array<string>;
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
    current?: boolean;
    startDate?: string;
    endDate?: string;
  }
}

export { ActivityControllerService }
