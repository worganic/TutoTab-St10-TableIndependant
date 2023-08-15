# WorganicTabV1 / v10 : Structure table

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Development server json

Run `json-server --watch db.json` for a dev server. Navigate to `http://localhost:3000/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Get clone 
> https://github.com/worganic/TutoTab-St10-create.git
> npm install
> cd .\worganic-tab-v1\
> ng serve

## Project :
v10 : Deplacement du tableau dans son propre component.

    - Deplacement de service dans shared/services
    - Création du component par default shared/component/worg-table.
    > ng g c shared/component/worg-table
        CREATE src/app/shared/component/worg-table/worg-table.component.html (25 bytes)
        CREATE src/app/shared/component/worg-table/worg-table.component.spec.ts (581 bytes)
        CREATE src/app/shared/component/worg-table/worg-table.component.ts (218 bytes)
        CREATE src/app/shared/component/worg-table/worg-table.component.scss (0 bytes)
    > On passe le component en standalone
        On passe toutes les functions/data dans le component mère worg-table.
    - On met le service principal dans le component parent et on envoi les infos à l'enfant.

## Infos plus :
   
## Update

## Historique :
Avant -> v9 : Création du tableau de base.
Après -> v11 : On met en place la liste des colonnes à affiché.

## Ressource :

## Abouts
created by Johann Loreau
create at 2023/07/29
Le project évolura suivant les remarques et conseils des visiteurs.