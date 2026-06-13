import { Button } from "@/components/Button";
import { perks } from "@/pages/IntroPage/PerksCarousel/perks";
import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function IntroWeb() {
  return (
    <ScrollView
      className="bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 80 }}
    >
      <View style={{ width: "100%", maxWidth: 960, paddingHorizontal: 40 }}>

        {/* Nav bar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            paddingBottom: 80,
          }}
        >
          <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
            Flota
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Button
              variant="text"
              label="Log in"
              onPress={() => router.push("/auth/login")}
            />
            <Button
              variant="outlined"
              label="Create an account"
              onPress={() => router.push("/auth/signup")}
            />
          </View>
        </View>

        {/* Hero */}
        <View style={{ alignItems: "center", gap: 20, paddingBottom: 96 }}>
          <Text
            className="font-heading font-bold uppercase text-high-emphasis"
            style={{ fontSize: 72, lineHeight: 76, textAlign: "center" }}
          >
            Every stack piece,{"\n"}demonstrated.
          </Text>
          <Text
            className="text-body-large text-medium-emphasis"
            style={{ textAlign: "center", maxWidth: 560 }}
          >
            A generic Expo + Yoga GraphQL starter that doubles as a living
            reference. Each tab demonstrates one slice of the stack.
          </Text>
          <Button
            variant="primary"
            label="Explore the demos"
            onPress={() => router.push("/home")}
          />
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(255,255,255,0.08)",
            marginBottom: 80,
          }}
        />

        {/* Features grid */}
        <View style={{ flexDirection: "row", gap: 24, flexWrap: "wrap" }}>
          {perks.map((perk) => (
            <View
              key={perk.id}
              style={{ flexBasis: "calc(33.33% - 16px)", flexGrow: 1, minWidth: 240, gap: 16 }}
            >
              <Image
                source={perk.image}
                style={{
                  width: "100%",
                  aspectRatio: 4 / 3,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                resizeMode="cover"
              />
              <View style={{ gap: 8 }}>
                <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
                  {perk.title}
                </Text>
                <Text className="text-body-small text-medium-emphasis">
                  {perk.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}
