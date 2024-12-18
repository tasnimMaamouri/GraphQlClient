import { Component, OnInit } from '@angular/core';
import { EmissionService } from './services/emission.service';
@Component({
  selector: 'app-root',
  template: `
  <div>
    <h1>GraphQL Emissions</h1>
    <button (click)="addNewEmission()">Add Emission</button>
    <ul>
      <li *ngFor="let emission of emissions">
        {{ emission.region }} - {{ emission.date }} - {{ emission.sector }}: {{ emission.value }}
      </li>
    </ul>
  </div>
`,  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ClientGraphql';
  emissions: any[] = [];

  constructor(private emissionService: EmissionService) {}

  ngOnInit() {
    this.getEmissionsByRegion();
  }

  addNewEmission() {
    this.emissionService
      .addEmission('Italy', '2024-12-18', 'Industriel', 247.0)
      .subscribe({
        next: (result) => {
          console.log('Emission added:');
          this.getEmissionsByRegion(); // Refresh list
        },
        error: (error) => console.error('Error:', error),
      });
  }

  getEmissionsByRegion() {
    this.emissionService.getMostEmissionsByRegion().subscribe({
      next: (result) => {
        console.log(result);  // Check the full response structure
        // Correcting the path to access the data
        this.emissions = [result.data.getMostEmissionsByRegion]; // Wrap in an array since it is a single object
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
