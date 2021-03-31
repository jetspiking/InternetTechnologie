import { Component, OnInit } from '@angular/core';
import { Cpu } from '../cpu';
import { CpuService } from '../cpu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  cpus: Cpu[] = [];

  constructor(private cpuService: CpuService) { }

  ngOnInit() {
    this.getCpus();
  }

  getCpus(): void {
    this.cpuService.getCpus()
      .subscribe(cpus => this.cpus = cpus.slice(1, 5));
  }
}