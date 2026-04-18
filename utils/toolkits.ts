const LENGTH_FACTORS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const WEIGHT_FACTORS: Record<string, number> = {
  g: 1,
  kg: 1000,
  lb: 453.59237,
  oz: 28.349523125,
};

const TOOLKITS: Record<ToolkitId, ToolkitConfig> = {
  length: {
    id: "length",
    title: "Length Converter",
    description: "Switch between metric and imperial units in one tap.",
    accent: "#ff7a1a",
    accentSoft: "rgba(255, 122, 26, 0.16)",
    units: [
      { key: "mm", label: "Millimeter", symbol: "mm" },
      { key: "cm", label: "Centimeter", symbol: "cm" },
      { key: "m", label: "Meter", symbol: "m" },
      { key: "km", label: "Kilometer", symbol: "km" },
      { key: "in", label: "Inch", symbol: "in" },
      { key: "ft", label: "Foot", symbol: "ft" },
      { key: "yd", label: "Yard", symbol: "yd" },
      { key: "mi", label: "Mile", symbol: "mi" },
    ],
    defaultFrom: "m",
    defaultTo: "km",
    exampleValue: "0",
  },
  temperature: {
    id: "temperature",
    title: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, and Kelvin instantly.",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.16)",
    units: [
      { key: "c", label: "Celsius", symbol: "°C" },
      { key: "f", label: "Fahrenheit", symbol: "°F" },
      { key: "k", label: "Kelvin", symbol: "K" },
    ],
    defaultFrom: "c",
    defaultTo: "f",
    exampleValue: "0",
  },
  weight: {
    id: "weight",
    title: "Weight Converter",
    description: "Move between grams, kilograms, pounds, and ounces.",
    accent: "#22c55e",
    accentSoft: "rgba(34, 197, 94, 0.16)",
    units: [
      { key: "g", label: "Gram", symbol: "g" },
      { key: "kg", label: "Kilogram", symbol: "kg" },
      { key: "lb", label: "Pound", symbol: "lb" },
      { key: "oz", label: "Ounce", symbol: "oz" },
    ],
    defaultFrom: "kg",
    defaultTo: "lb",
    exampleValue: "0",
  },
};

export const TOOLKIT_LIST = Object.values(TOOLKITS);

export function getToolkitConfig(id: ToolkitId) {
  return TOOLKITS[id];
}

export function createInitialToolkitState(id: ToolkitId): ToolkitState {
  const config = getToolkitConfig(id);

  return {
    value: config.exampleValue,
    from: config.defaultFrom,
    to: config.defaultTo,
  };
}

export function convertToolkitValue(
  toolkitId: ToolkitId,
  value: number,
  from: string,
  to: string,
) {
  if (toolkitId === "temperature") {
    return convertTemperature(value, from, to);
  }

  if (toolkitId === "weight") {
    return convertByFactor(value, from, to, WEIGHT_FACTORS);
  }

  return convertByFactor(value, from, to, LENGTH_FACTORS);
}

function convertByFactor(
  value: number,
  from: string,
  to: string,
  factors: Record<string, number>,
) {
  const sourceFactor = factors[from];
  const targetFactor = factors[to];

  if (sourceFactor === undefined || targetFactor === undefined) {
    return Number.NaN;
  }

  return (value * sourceFactor) / targetFactor;
}

function convertTemperature(value: number, from: string, to: string) {
  let celsiusValue = value;

  if (from === "f") {
    celsiusValue = ((value - 32) * 5) / 9;
  } else if (from === "k") {
    celsiusValue = value - 273.15;
  }

  if (to === "c") {
    return celsiusValue;
  }

  if (to === "f") {
    return (celsiusValue * 9) / 5 + 32;
  }

  return celsiusValue + 273.15;
}

export function formatToolkitValue(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  const absoluteValue = Math.abs(value);
  const fractionDigits =
    absoluteValue >= 1000 ? 1 : absoluteValue >= 10 ? 2 : 4;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function getUnitLabel(toolkitId: ToolkitId, unitKey: string) {
  const config = getToolkitConfig(toolkitId);
  const foundUnit = config.units.find((unit) => unit.key === unitKey);

  return foundUnit?.symbol ?? unitKey;
}
