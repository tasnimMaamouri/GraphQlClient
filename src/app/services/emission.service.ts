import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmissionService {
  private graphqlUrl = 'http://localhost:8182/graphql'; // URL de votre service GraphQL

  constructor(private apollo: Apollo) {}

  // Méthode pour ajouter une nouvelle émission
  addEmission(region: string, date: string, sector: string, value: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmission($region: String, $date: String, $sector: String, $value: Float) {
          addEmission(region: $region, date: $date, sector: $sector, value: $value) {
            region
            date
            sector
            value
          }
        }
      `,
      variables: { region, date, sector, value },
    });
  }

  // Méthode pour récupérer les émissions par région
  getMostEmissionsByRegion(): Observable<any> {
    const GET_MOST_EMISSIONS_QUERY = gql`
      query {
        getMostEmissionsByRegion {
          region
          date
          sector
          value
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_MOST_EMISSIONS_QUERY,
    }).valueChanges;
  }

  // Méthode pour récupérer les émissions par secteur
  getMostEmissionsBySector(): Observable<any> {
    const GET_MOST_EMISSIONS_SECTOR_QUERY = gql`
      query {
        mostEmissionsBySector {
          sector
          value
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_MOST_EMISSIONS_SECTOR_QUERY,
    }).valueChanges;
  }
}
