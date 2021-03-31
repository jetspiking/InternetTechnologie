import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Cpu } from '../cpu';
import { CpuService } from '../cpu.service';

@Component({
  selector: 'app-cpu-detail',
  templateUrl: './cpu-detail.component.html',
  styleUrls: [ './cpu-detail.component.scss' ]
})
export class CpuDetailComponent implements OnInit {
  cpu: Cpu;

  constructor(
    private route: ActivatedRoute,
    private cpuService: CpuService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCpu();
  }

  getCpu(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cpuService.getCpu(id)
      .subscribe(cpu => this.cpu = cpu);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.cpuService.updateCpu(this.cpu)
      .subscribe(() => this.goBack());
  }
}