// src/components/layouts/SelectOptions.ts

export interface SelectOption {
    value: string;
    label: string;
  }
  
  export const categoryOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "pain-relief", label: "Pain Relief" },
    { value: "antibiotics", label: "Antibiotics" },
    { value: "vitamins", label: "Vitamins & Supplements" },
    { value: "cold-flu", label: "Cold & Flu" },
    { value: "digestive-health", label: "Digestive Health" },
    { value: "skin-care", label: "Skin Care" },
  ];
  
  export const brandOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "gsk", label: "GSK (GlaxoSmithKline)" },
    { value: "pfizer", label: "Pfizer" },
    { value: "johnson-johnson", label: "Johnson & Johnson" },
    { value: "sanofi", label: "Sanofi" },
    { value: "novartis", label: "Novartis" },
    { value: "abbott", label: "Abbott" },
  ];
  
  export const colorsList: SelectOption[] = [
    { value: "white", label: "White" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
  ];
  
  export const availabilityOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "available", label: "In Stock" },
    { value: "out_of_stock", label: "Out of Stock" },
  ];
  