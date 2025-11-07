import { Routes } from '@angular/router';
import { count } from 'rxjs';
import { Countrylayout } from './layouts/countrylayout/countrylayout';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { ByCountryPage } from './pages/by-Country-Page/by-Country-Page';
import { ByRegionPage } from './pages/by-Region-Page/by-Region-Page';
import { CountryPage } from './pages/country-page/country-page';

export const conuntryRoutes: Routes = [


  {
    path:'',
    component: Countrylayout,
    children:[
      {
        path: 'by-capital',
        component: ByCapitalPage
      },
      {
        path: 'by-Country-Page',
        component: ByCountryPage
      },
      {
        path: 'by-Region-Page',
        component: ByRegionPage
      },
       {
        path: 'by/:code',
        component: CountryPage
      },
      {
        path: '**',
        redirectTo:'by-capital'
      },

    ]
  },
  // by-Country-Page

  // by-Region-Page


];


export default conuntryRoutes;
