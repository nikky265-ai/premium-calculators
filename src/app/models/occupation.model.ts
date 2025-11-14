export interface Occupation {
  code: string;
  name: string;
  rating: 'Professional' | 'WhiteCollar' | 'LightManual' | 'HeavyManual';
  factor: number;
}
