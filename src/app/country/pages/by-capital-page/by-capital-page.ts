import { Component, inject,linkedSignal,resource,signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { catchError, firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',

})
export class ByCapitalPage {

  countryService = inject(CountryService);


  ActivatedRoute = inject(ActivatedRoute)

  router = inject(Router)

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(()=>this.queryParam);


    countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {

      if (!params.query) return of([]);
      this.router.navigate(['/country/by-capital'],{
        queryParams:{
        query:params.query,

        }
      })
      return this.countryService.searchbyCapital(params.query).pipe(
        catchError((err) => {
          console.error('Error en búsqueda de región:', err);
          // devolvemos un array vacío para que el flujo siga
          return of([]);
        })
      );
    },
  });





  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);


  // onSearch(query:string){

  //   if(this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  // this.countryService.searchbyCapital(query).subscribe({
  //   next: (countries) => {
  //   this.isLoading.set(false);
  //   this.countries.set(countries);

  //   },
  //   error: (err) => {

  //      this.isLoading.set(false)
  //      this.countries.set([])
  //      this.isError.set(err);
  //   },
  //  });
  // }
 }
