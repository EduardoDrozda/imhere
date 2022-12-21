import { Text, TouchableOpacity, View } from "react-native";

import { IParticipant } from "../../interfaces";
import { styles } from "./styles";

type Props = {
  participant: IParticipant;
  onRemove: () => void;
};

export function Participant({ participant, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {participant.id} - {participant.name}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRemove}
        testID="onRemove"
      >
        <Text style={styles.buttonText}> - </Text>
      </TouchableOpacity>
    </View>
  );
}
