import {Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { catchError, firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-Country-Page.html',

})
export class ByCountryPage {

  countryService = inject(CountryService);
  ActivatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(()=>this.queryParam);


  countryResource = rxResource({
  params: () => ({ query: this.query() }),

  stream: ({ params }) => {
    if (!params.query) return of([]);
     this.router.navigate(['/country/by-Country-Page'],{
        queryParams:{
          query:params.query,

        }
      })

    return this.countryService.searchByCountry(params.query).pipe(
      catchError((err) => {
        console.error('Error en búsqueda de región:', err);
        // devolvemos un array vacío para que el flujo siga
        return of([]);
      })
    );
  },
});



}



