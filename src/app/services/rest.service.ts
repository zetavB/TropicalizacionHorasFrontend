// import { Observable, of } from 'rxjs';
// abstract class RestService {

//   protected baseUrl: 'http://your.api.domain';

//   constructor(private http: Http){}

//   protected get headers(): Headers {
//     /*
//     * for example, add an authorization token to each request,
//     * take it from some CookieService, for example
//     * */
//     const token: string = this.cookieService.get('token');
//     return new Headers({token: token});
//   }

//   protected get(relativeUrl: string): Observable<any> {
//     return this.http.get(this.baseUrl + relativeUrl, new RequestOptions({headers: this.headers}))
//       .map(res => res.json());
//     // as you see, the simple toJson mapping logic also delegates here
//   }
  
//   protected post(relativeUrl: string, data: any) {
//     // and so on for every http method that your API supports
//   }

// }