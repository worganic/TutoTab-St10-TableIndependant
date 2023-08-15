import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { WorgTableComponent } from 'src/app/shared/component/worg-table/worg-table.component';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, WorgTableComponent, CommonModule]
})
export class UsersComponent implements OnInit {

  // Données du tableau :
  dataAsync$: Observable<any> | undefined;

  // Options du tableau :
  tableOption!: any[];
  options: any = {
    'affichage': true,// Affichage de app-worg-table.
    'timer': true,// Utilisation ou non du timer.
    'timerTemps': 60,// Temps du timer (réactualisation des données).
    
  };
  
  /**
   * constructor
   * 
   * @param _usersService 
   * @param _fb 
   */
  constructor(
    private _usersService: UsersService,// Service.
  ) { }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    //console.log('UsersComponent / ngOnInit');

    // Liste des options :
    this.tableOption = [
       this.options,// Options.
       this._usersService// Service envoyé à app-worg-table.
     ];
  }

  /**
   * Récupération des données :
   */ 
  getData() {
    //console.log("UsersComponent / getData");
    this.dataAsync$ = this._usersService.geUsers().pipe(
      map((jsonArray: any) => {
        //console.log("UsersComponent / getData / res :", jsonArray);
        return jsonArray;
      })
    );
  }

}
