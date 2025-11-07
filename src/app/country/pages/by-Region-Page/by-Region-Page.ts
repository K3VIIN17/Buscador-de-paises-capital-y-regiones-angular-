
import { Component, inject, linkedSignal, signal } from '@angular/core';

import { CountryList } from "../../components/country-list/country-list";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';

import { catchError, of } from 'rxjs';
import { CountryService } from '../../services/country';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam:string):Region{
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region>= {
    'africa': 'Africa',
    'americas':'Americas',
    'asia':'Asia',
    'europe':'Europe',
    'oceania':'Oceania',
    'antarctic':'Antarctic'
  };
  return validRegions[queryParam] ?? 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-Region-Page.html',
})
export class ByRegionPage {
 CountryService = inject(CountryService)




   public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];


  ActivatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region|null>(()=>validateQueryParam(this.queryParam));




  countryResource = rxResource({
  params: () => ({ region: this.selectedRegion() }),

  stream: ({ params }) => {
    console.log({params: params.region})
    if (!params.region) return of([]);
      this.router.navigate(['/country/by-Region-Page'],{
        queryParams:{
          region:params.region,

        }
      })

    return this.CountryService.searchByRegion(params.region)
  },
});

}
