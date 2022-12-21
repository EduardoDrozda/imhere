import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IParticipant, Participant } from "../../shared";

import { styles } from "./styles";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [participant, setParticipant] = useState<string>("");

  function handleParticipantAdd() {
    const participantExists = findParticipantByName(participant);
    if (participantExists) {
      return Alert.alert(
        "Participante existente",
        "O participante já está na lista."
      );
    }

    const newParticipant = {
      id: participants.length + 1,
      name: participant,
    };

    setParticipants((prevState) => [...prevState, newParticipant]);
    resetForm();
  }

  function findParticipantByName(particpantsName: string) {
    return participants.find(({ name }) => name === particpantsName);
  }

  function resetForm() {
    setParticipant("");
  }

  function handleParticipantRemove(participant: IParticipant) {
    Alert.alert(
      "Remover participante",
      `Deseja remover ${participant?.name} da lista?`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => removeParticipant(participant.id),
        },
      ]
    );
  }

  function removeParticipant(participantId: number) {
    const newParticipants = participants.filter(
      ({ id }) => id !== participantId
    );

    setParticipants(newParticipants);

    Alert.alert("Participante removido", "Participante removido com sucesso.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          testID="input"
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(e) => setParticipant(e)}
          value={participant}
        />

        <TouchableOpacity
          testID="button"
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Participant
            participant={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        }
      />
    </View>
  );
}
