import type{ Country } from '../interfaces/country.interface';
import type{ RESTCountry } from '../interfaces/rest-countries.interfaces';
export class CountryMapper{
  //static RestCountry =>country
  static mapRestCountryToCountry(restCountry:RESTCountry):Country{
    return{
      capital:restCountry.capital?.join(','),
      cca2:restCountry.cca2,
      flag: restCountry.flag,
      flagSvg:restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population:restCountry.population,
      region:restCountry.region,
      subRegion:restCountry.subregion,

    }
  }


 // static RestCountry =>country[]

   static mapRestCountryToCountryArray(restCountries:RESTCountry[]):Country[]{
    return restCountries.map((Country) => this.mapRestCountryToCountry(Country))
  }
}
