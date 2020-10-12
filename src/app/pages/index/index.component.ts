import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapboxService } from 'src/app/_services/mapbox.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  searchForm: FormGroup;
  constructor( private formBuilder: FormBuilder, private mapboxService: MapboxService) { 
    this.searchForm = this.formBuilder.group({
      comunas: [null, []]
    });
  }

  ngOnInit(): void {
    this.mapboxService.buildMap();
    this.mapboxService.addPoints();
    this.searchForm.get('comunas').valueChanges.subscribe(val => {
      this.mapboxService.getPharmacies(val).subscribe((data)=>{
        this.mapboxService.updatePoints(data);
      })
    });
  }
}
