import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-worg-table',
  templateUrl: './worg-table.component.html',
  styleUrls: ['./worg-table.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, WorgTableComponent]
})
export class WorgTableComponent implements OnInit {

  // Récupération des options du tableau :
  @Input() tableOption!: any[];
  // Récupération des data :
  @Input() ELEMENT_DATA!: any[];// Données récupéré en asynchrone.

  // Appel pour récupération des data :
  @Output() newDataEvent = new EventEmitter<string>();
  
  // Actualisation de la zone infos.
  infoActualisation: boolean = false;

  // Data récupéré et affiché dans la vue.
  DATATAB!: any[];

  // Timer de réactualisation :
  interval: any | undefined;// Premier timer d'actualisation.
  interval2: any | undefined;// Second timer pour l'affichage des infos de maj.
  timeLeft: number = environment.timerUser;
  time = 0;

  // Table options : 
  tableAffichage: boolean = true;
  tableTimer: boolean = true;
  tableTimerTemps: number = environment.timerUser;
  service: any;// Service récupéré.

  /**
   * constructor
   * 
   * @param _fb 
   */
  constructor(
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    console.log('WorgTableComponent | ngOnInit');

    // Récupération des option du tableau :
    console.log('WorgTableComponent | ngOnInit / this.tableOption :', this.tableOption);
    this.tableAffichage = this.tableOption[0]['affichage'];
    this.tableTimer = this.tableOption[0]['timer'];
    this.tableTimerTemps = this.tableOption[0]['timerTemps'];
    this.service =  this.tableOption[1];

    if(this.tableTimerTemps && this.timeLeft != this.tableTimerTemps)this.timeLeft = this.tableTimerTemps;

    console.log('WorgTableComponent | ngOnInit / this.tableTimerTemps :', this.tableTimerTemps);
    // Récupération des employés :
    this.startTimer();
  }

  /**
   * 
   */
  ngOnDestroy() {
    if (this.interval) {
      console.log("WorgTableComponent | ngOnDestroy");
      clearInterval(this.interval);
    }
  }

  /**
   * 
   */
  startTimer() {
    this.time = this.timeLeft;
    //console.log("WorgTableComponent | startTimer / this.time", this.time);
    this.recupData();
    this.interval = setInterval(() => {
      //console.log("WorgTableComponent | startTimer /setInterval / this.time", this.time);
      if (this.time > 0) {
        this.time--;
      } else {
        //console.log("WorgTableComponent | startTimer");
        this.service.deleteCached();
        this.recupData();
        this.time = this.timeLeft;
      }
    }, 1000)
  }

  /**
   * 
   */
  majDonnees() {
    //console.log("> WorgTableComponent | majDonnees");
    this.time = 0;
  }

  /**
   * 
   */
  startTimerInfo() {
    var time = 5;
    //console.log("WorgTableComponent | startTimerInfo / time", time);
    this.interval2 = setInterval(() => {
      //console.log("WorgTableComponent | startTimerInfo / interval2 / time", time);
      if (time > 0) {
        time--;
      } else {
        //console.log("WorgTableComponent | startTimerInfo FIN");
        this.infoActualisation = false;
        time = 0;
        clearInterval(this.interval2);
      }
    }, 1000)
  }

  /**
   * 
   */
  recupData() {
    console.log("WorgTableComponent / recupData");
    this.newDataEvent.emit('add');
  }

  // Function de Récupération des employés :
  majData(res: any) {
    console.log("WorgTableComponent / majData");
        var isEqual = JSON.stringify(this.DATATAB) === JSON.stringify(res);

        if (!isEqual) {
          this.DATATAB = res;
          console.log("WorgTableComponent / majData / subscribe / res :", res);
          this.infoActualisation = true;
          this.startTimerInfo();
        } else {
          //console.log("WorgTableComponent / majData / subscribe / Pas de de MAJ");
          this.infoActualisation = false;
        }
  }


  /**
   * ngOnChanges
   * Si les données envoyé change :
   * 
   * ELEMENT_DATA
   */
  ngOnChanges() {
    // console.log("WorgTableComponent | ngOnChanges");

    // Check if the data exists before using it
    if (this.ELEMENT_DATA) {
      //console.log("WorgTableComponent | ngOnChanges / this.ELEMENT_DATA :", this.ELEMENT_DATA);
      this.majData(this.ELEMENT_DATA);

    }
  }
}
