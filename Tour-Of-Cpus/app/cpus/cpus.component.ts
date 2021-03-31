import { Component, OnInit } from '@angular/core';

import { Cpu } from '../cpu';
import { CpuService } from '../cpu.service';

@Component({
  selector: 'app-cpus',
  templateUrl: './cpus.component.html',
  styleUrls: ['./cpus.component.scss']
})
export class CpusComponent implements OnInit {
  cpus: Cpu[];

  constructor(private cpuService: CpuService) { }

  ngOnInit() {
    this.getCpus();
  }

  getCpus(): void {
    this.cpuService.getCpus()
    .subscribe(cpus => this.cpus = cpus);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.cpuService.addCpu({ name } as Cpu)
      .subscribe(cpu => {
        this.cpus.push(cpu);
      });
  }

  delete(cpu: Cpu): void {
    this.cpus = this.cpus.filter(c => c !== cpu);
    this.cpuService.deleteCpu(cpu.id).subscribe();
  }

}