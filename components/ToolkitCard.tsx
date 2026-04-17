import { useState } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
  type PressableStateCallbackType,
} from "react-native";
import {
  convertToolkitValue,
  createInitialToolkitState,
  formatToolkitValue,
  getUnitLabel,
  type ToolkitConfig,
} from "@/utils/toolkits";

type ToolkitCardProps = {
  toolkit: ToolkitConfig;
};

export function ToolkitCard({ toolkit }: ToolkitCardProps) {
  const [state, setState] = useState(() =>
    createInitialToolkitState(toolkit.id),
  );

  const parsedValue = Number(state.value.replace(",", "."));
  const convertedValue = convertToolkitValue(
    toolkit.id,
    Number.isFinite(parsedValue) ? parsedValue : 0,
    state.from,
    state.to,
  );

  const resultUnitLabel = getUnitLabel(toolkit.id, state.to);
  const inputUnitLabel = getUnitLabel(toolkit.id, state.from);

  const swapUnits = () => {
    setState((previous) => ({
      ...previous,
      from: previous.to,
      to: previous.from,
    }));
  };

  const handleValueChange = (text: string) => {
    setState((previous) => ({
      ...previous,
      value: text,
    }));
  };

  return (
    <View
      className="gap-4 rounded-[28px] border bg-slate-950/82 px-[18px] pb-5 pt-5"
      style={{ borderColor: toolkit.accentSoft }}
    >
      <View
        className="gap-2 rounded-[22px] border p-[18px]"
        style={{
          backgroundColor: toolkit.accentSoft,
          borderColor: toolkit.accent,
        }}
      >
        <Text className="text-3xl font-extrabold text-slate-50">
          {formatToolkitValue(convertedValue)}{" "}
          <Text className="text-lg font-bold text-slate-300">
            {resultUnitLabel}
          </Text>
        </Text>
        <Text className="leading-[18px] text-[13px] text-slate-400">
          {state.value.trim().length > 0
            ? `${state.value} ${inputUnitLabel} = ${formatToolkitValue(convertedValue)} ${resultUnitLabel}`
            : "Enter a value to calculate the conversion."}
        </Text>
      </View>

      <View className="gap-2">
        <Text className="text-[13px] font-bold uppercase tracking-[0.8px] text-slate-200">
          Value
        </Text>
        <TextInput
          value={state.value}
          onChangeText={handleValueChange}
          keyboardType={Platform.OS === "ios" ? "decimal-pad" : "default"}
          inputMode="decimal"
          placeholder={toolkit.exampleValue}
          placeholderTextColor="#94a3b8"
          autoCorrect={false}
          autoCapitalize="none"
          editable
          selectTextOnFocus
          showSoftInputOnFocus
          blurOnSubmit={false}
          contextMenuHidden={false}
          className="rounded-[18px] border bg-slate-900/95 px-4 py-3.5 text-lg font-semibold text-slate-50"
          style={{ borderColor: toolkit.accentSoft }}
        />
      </View>

      <View className="flex-row items-start gap-2.5">
        <View className="flex-1 gap-2">
          <Text className="text-[13px] font-bold uppercase tracking-[0.8px] text-slate-200">
            From
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {toolkit.units.map((unit) => {
              const selected = state.from === unit.key;

              return (
                <UnitChip
                  key={unit.key}
                  label={unit.symbol}
                  selected={selected}
                  accent={toolkit.accent}
                  onPress={() =>
                    setState((previous) => ({
                      ...previous,
                      from: unit.key,
                    }))
                  }
                />
              );
            })}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Swap conversion units"
          onPress={swapUnits}
          className="mt-[22px] h-11 w-11 items-center justify-center rounded-full border"
          style={({ pressed }: PressableStateCallbackType) => [
            {
              borderColor: toolkit.accentSoft,
              backgroundColor: pressed ? toolkit.accentSoft : "transparent",
            },
          ]}
        >
          <Text
            className="text-lg font-extrabold"
            style={{ color: toolkit.accent }}
          >
            ⇄
          </Text>
        </Pressable>

        <View className="flex-1 gap-2">
          <Text className="text-[13px] font-bold uppercase tracking-[0.8px] text-slate-200">
            To
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {toolkit.units.map((unit) => {
              const selected = state.to === unit.key;

              return (
                <UnitChip
                  key={unit.key}
                  label={unit.symbol}
                  selected={selected}
                  accent={toolkit.accent}
                  onPress={() =>
                    setState((previous) => ({
                      ...previous,
                      to: unit.key,
                    }))
                  }
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

type UnitChipProps = {
  label: string;
  selected: boolean;
  accent: string;
  onPress: () => void;
};

function UnitChip({ label, selected, accent, onPress }: UnitChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="rounded-full border px-3 py-2.5 hover:bg-slate-700/10 "
      style={({ pressed }: PressableStateCallbackType) => [
        {
          backgroundColor: selected ? accent : "#0f172a",
          borderColor: selected ? accent : "rgba(148, 163, 184, 0.18)",
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Text className="text-[13px] font-bold text-slate-50">{label}</Text>
    </Pressable>
  );
}
