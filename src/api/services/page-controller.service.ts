/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageEntity } from '../models/page-entity';
import { ResourcePageEntity } from '../models/resource-page-entity';
import { StringPrimitive } from '../models/string-primitive';

/**
 * Page Controller
 */
@Injectable({
  providedIn: 'root',
})
class PageControllerService extends __BaseService {
  static readonly pageControllerReadAllPath = '/pages';
  static readonly pageControllerCreatePath = '/pages';
  static readonly pageControllerReadOnePath = '/pages/{pageId}';
  static readonly pageControllerUpdatePath = '/pages/{pageId}';
  static readonly pageControllerDeletePath = '/pages/{pageId}';
  static readonly pageControllerIncreaseLikePath = '/pages/{pageId}/like';
  static readonly pageControllerReadTopicPath = '/pages/{pageId}/topic';
  static readonly pageControllerUpdateTopicPath = '/pages/{pageId}/topic';
  static readonly pageControllerReadTranslationsPath = '/pages/{pageId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PageControllerService.PageControllerReadAllParams` containing the following parameters:
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
   * @return OK
   */
  pageControllerReadAllResponse(params: PageControllerService.PageControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pages`,
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
   * @param params The `PageControllerService.PageControllerReadAllParams` containing the following parameters:
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
   * @return OK
   */
  pageControllerReadAll(params: PageControllerService.PageControllerReadAllParams): __Observable<{}> {
    return this.pageControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newPage newPage
   * @return OK
   */
  pageControllerCreateResponse(newPage: PageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newPage;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pages`,
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
   * @param newPage newPage
   * @return OK
   */
  pageControllerCreate(newPage: PageEntity): __Observable<{}> {
    return this.pageControllerCreateResponse(newPage).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param pageId pageId
   * @return OK
   */
  pageControllerReadOneResponse(pageId: string): __Observable<__StrictHttpResponse<ResourcePageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pages/${pageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourcePageEntity>;
      })
    );
  }
  /**
   * @param pageId pageId
   * @return OK
   */
  pageControllerReadOne(pageId: string): __Observable<ResourcePageEntity> {
    return this.pageControllerReadOneResponse(pageId).pipe(
      __map(_r => _r.body as ResourcePageEntity)
    );
  }

  /**
   * @param newPage newPage
   * @param pageId pageId
   * @return OK
   */
  pageControllerUpdateResponse(newPage: PageEntity,
    pageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newPage;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pages/${pageId}`,
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
   * @param newPage newPage
   * @param pageId pageId
   * @return OK
   */
  pageControllerUpdate(newPage: PageEntity,
    pageId: string): __Observable<{}> {
    return this.pageControllerUpdateResponse(newPage, pageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param pageId pageId
   * @return OK
   */
  pageControllerDeleteResponse(pageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/pages/${pageId}`,
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
   * @param pageId pageId
   * @return OK
   */
  pageControllerDelete(pageId: string): __Observable<{}> {
    return this.pageControllerDeleteResponse(pageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param pageId pageId
   * @return OK
   */
  pageControllerIncreaseLikeResponse(pageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pages/${pageId}/like`,
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
   * @param pageId pageId
   * @return OK
   */
  pageControllerIncreaseLike(pageId: string): __Observable<{}> {
    return this.pageControllerIncreaseLikeResponse(pageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param pageId pageId
   * @return OK
   */
  pageControllerReadTopicResponse(pageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pages/${pageId}/topic`,
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
   * @param pageId pageId
   * @return OK
   */
  pageControllerReadTopic(pageId: string): __Observable<{}> {
    return this.pageControllerReadTopicResponse(pageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param pageId pageId
   * @param topicId topicId
   * @return OK
   */
  pageControllerUpdateTopicResponse(pageId: string,
    topicId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = topicId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pages/${pageId}/topic`,
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
   * @param pageId pageId
   * @param topicId topicId
   * @return OK
   */
  pageControllerUpdateTopic(pageId: string,
    topicId: StringPrimitive): __Observable<{}> {
    return this.pageControllerUpdateTopicResponse(pageId, topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param pageId pageId
   * @return OK
   */
  pageControllerReadTranslationsResponse(pageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pages/${pageId}/translations`,
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
   * @param pageId pageId
   * @return OK
   */
  pageControllerReadTranslations(pageId: string): __Observable<{}> {
    return this.pageControllerReadTranslationsResponse(pageId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module PageControllerService {

  /**
   * Parameters for pageControllerReadAll
   */
  export interface PageControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { PageControllerService }
