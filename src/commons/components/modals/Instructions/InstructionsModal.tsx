import {
  VStack,
  Heading,
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  HStack,
} from "@chakra-ui/react";
import { IModalProps } from "commons/types/Modal";
import { Letter } from "commons/components/ui";
import { AccuracyLevel } from "commons/types";

export interface InstructionsModalProps extends IModalProps {}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  payload,
}) => {
  const onSubmit = payload.onSubmit;

  return (
    <ModalContent maxWidth="546px">
      <ModalHeader>
        <HStack justifyContent="center">
          <Heading>Cómo jugar</Heading>
        </HStack>
      </ModalHeader>
      <ModalBody px="10" pt="10" pb="6">
        <VStack spacing="4" justifyItems="center">
          <VStack spacing="2" alignItems="start">
            <Text>Adivina la palabra oculta en cinco intentos.</Text>
            <Text>Cada intento debe ser una palabra válida de 5 letras.</Text>
            <Text>
              Después de cada intento el color de las letras cambia para mostrar
              qué tan cerca estás de acertar la palabra.
            </Text>
          </VStack>
          <VStack spacing="4" alignItems="start">
            <Text fontWeight="bold">Ejemplos</Text>
            <HStack spacing="2" w="100%" justifyContent="center">
              {"GATOS".split("").map((letter) => (
                <Letter
                  size="md"
                  letter={{
                    letter,
                    accuracy:
                      letter === "G"
                        ? AccuracyLevel.perfect
                        : AccuracyLevel.initial,
                  }}
                />
              ))}
            </HStack>
            <Text>
              La letra G está en la palabra y en la posición correcta.
            </Text>
            <HStack spacing="2" w="100%" justifyContent="center">
              {"VOCAL".split("").map((letter) => (
                <Letter
                  size="md"
                  letter={{
                    letter,
                    accuracy:
                      letter === "C"
                        ? AccuracyLevel.contains
                        : AccuracyLevel.initial,
                  }}
                />
              ))}
            </HStack>
            <Text>
              La letra C está en la palabra pero en la posición incorrecta.
            </Text>
            <HStack spacing="2" w="100%" justifyContent="center">
              {"CANTO".split("").map((letter) => (
                <Letter
                  size="md"
                  letter={{
                    letter,
                    accuracy:
                      letter === "O"
                        ? AccuracyLevel.none
                        : AccuracyLevel.initial,
                  }}
                />
              ))}
            </HStack>
            <Text>La letra O no está en la palabra..</Text>

            <Text>
              Puede haber letras repetidas. Las pistas son independientes para
              cada letra.
            </Text>
          </VStack>

          <Text>¡Una palabra nueva cada 5 minutos!</Text>
          <Button
            width="264px"
            height="50px"
            bgColor="green.300"
            color="white"
            fontWeight="extrabold"
            fontSize="28px"
            onClick={onSubmit}
          >
            JUGAR!
          </Button>
        </VStack>
      </ModalBody>
    </ModalContent>
  );
};
