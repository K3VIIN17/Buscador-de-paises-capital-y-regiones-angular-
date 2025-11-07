import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from "../../components/top-menu/top-menu";

@Component({
  selector: 'app-countrylayout',
  imports: [RouterOutlet, TopMenu],
  templateUrl: './countrylayout.html',

})
export class Countrylayout { }
