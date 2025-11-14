import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PremiumService } from './services/premium.service';
import { oneOfRequiredValidator } from './validators/one-of.validator';
import { CalculatePremiumRequest, CalculatePremiumResponse } from './models/premium.models';
import { Occupation } from './models/occupation.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private fb = inject(FormBuilder);
  private api = inject(PremiumService);

  title = 'Premium Calculator';

  occupations = signal<Occupation[] | null>(null);
  loadingOccupations = signal(false);
  loadingPremium = signal(false);
  error = signal<string | null>(null);
  result = signal<CalculatePremiumResponse | null>(null);

  autoCalculate = signal<boolean>(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    ageNextBirthday: [null as number | null, [Validators.min(1), Validators.max(120)]],
    dateOfBirth: [null as string | null], // yyyy-MM-dd (ISO)
    occupationCode: ['', Validators.required],
    deathSumInsured: [null as number | null, [Validators.required, Validators.min(1)]]
  }, { validators: [oneOfRequiredValidator(['ageNextBirthday', 'dateOfBirth'])] });

  constructor() {
    this.loadOccupations();

    // Optional auto-calc: whenever form becomes valid and toggle ON
    effect(() => {
      if (!this.autoCalculate()) return;
      if (this.form.valid) this.calculate();
      else this.result.set(null);
    });
  }

  loadOccupations() {
    this.loadingOccupations.set(true);
    this.api.getOccupations().subscribe({
      next: (list) => {
        this.occupations.set(list);
        this.loadingOccupations.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load occupations');
        this.loadingOccupations.set(false);
      }
    });
  }

  calculate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const payload: CalculatePremiumRequest = {
      name: v.name!,
      ageNextBirthday: v.ageNextBirthday ?? null,
      dateOfBirth: v.dateOfBirth ?? null,
      occupationCode: v.occupationCode!,
      deathSumInsured: v.deathSumInsured!
    };
    this.loadingPremium.set(true);
    this.error.set(null);
    this.result.set(null);

    this.api.calculatePremium(payload).subscribe({
      next: (res) => {
        this.result.set(res);
        this.loadingPremium.set(false);
      },
      error: (err) => {
        console.error(err);
        const msg = err?.error?.error || 'Failed to calculate premium';
        this.error.set(msg);
        this.loadingPremium.set(false);
      }
    });
  }

  get f() { return this.form.controls; }
  showFieldError(ctrlName: string): boolean {
    const c = this.form.get(ctrlName);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
}
