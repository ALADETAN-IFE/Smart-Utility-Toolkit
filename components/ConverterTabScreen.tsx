import { ScrollView, Text, View } from "react-native";
import { ToolkitCard } from "@/components/ToolkitCard";
import { getToolkitConfig } from "@/utils/toolkits";

export function ConverterTabScreen({
  toolkitId,
  eyebrow,
}: ConverterTabScreenProps) {
  const toolkit = getToolkitConfig(toolkitId);

  return (
    <View className="flex-1 bg-[#0a0a0c]">
      <View
        pointerEvents="none"
        className="absolute -left-16 top-14 h-52 w-52 rounded-full bg-orange-500/20"
      />
      <View
        pointerEvents="none"
        className="absolute -right-20 top-40 h-60 w-60 rounded-full bg-red-500/15"
      />

      <ScrollView
        contentContainerStyle={{ gap: 20, paddingHorizontal: 20, paddingBottom: 112, paddingTop: 56 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3 rounded-3xl border border-zinc-700/45 bg-zinc-950/88 p-5">
          <Text className="text-xs font-extrabold uppercase tracking-[1.4px] text-orange-300">
            {eyebrow}
          </Text>
          <Text className="text-[31px] font-extrabold leading-9 tracking-[-0.4px] text-zinc-50">
            {toolkit.title}
          </Text>
          <Text className="text-sm leading-6 text-zinc-300">
            {toolkit.description}
          </Text>
        </View>

        <ToolkitCard toolkit={toolkit} />
      </ScrollView>
    </View>
  );
}
