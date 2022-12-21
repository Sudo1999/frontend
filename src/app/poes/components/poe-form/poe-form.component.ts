import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoeService } from 'src/app/core/services/poe.service';
import { FormBuilderService } from '../../formbuilder/form-builder.service';

@Component({
  selector: 'app-poe-form',
  templateUrl: './poe-form.component.html',
  styleUrls: ['./poe-form.component.scss']
})
export class PoeFormComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private poeService: PoeService,
    private formBuilderService: FormBuilderService
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data);
  }

}
