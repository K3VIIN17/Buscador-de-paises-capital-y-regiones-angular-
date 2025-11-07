import {Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country';
import { NotFound } from "../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";



@Component({
  selector: 'country-page',

  templateUrl: './country-page.html',
  imports: [NotFound, CountryInformation],

})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService);
   countryResource = rxResource({
    params: () => this.countryCode,
    stream: ({ params: code }) => {
      return this.CountryService.searchByCountryByAlphaCode(code);
    }
  });
}
