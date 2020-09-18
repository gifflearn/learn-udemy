import { Component, OnInit } from '@angular/core';
import { Property } from '../interfaces/Property';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;

  constructor(private route: ActivatedRoute, private propService: PropertiesService) { }

  ngOnInit() {
    // this.property = new Property('', '', '', '', '', '', []);
    const id = this.route.snapshot.params.id;
    this.propService.getSingleProperty(+id).then(
      (property: Property) => {
        this.property = property;
      }
    );
  }

}

