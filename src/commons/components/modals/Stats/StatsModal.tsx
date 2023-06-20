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
import { IUserSession } from "commons/types/UserSession";

export interface StatsModalPayload {
  session: IUserSession;
  nextWordTime: number;
  secretWord?: string;
}

export interface StatsModalProps extends IModalProps<StatsModalPayload> {}

export const StatsModal: React.FC<StatsModalProps> = ({ payload }) => {
  const onSubmit = payload.onSubmit;
  const nextWordTime = payload.metadata?.nextWordTime ?? "00:00";
  const stats = payload.metadata?.session ?? { played: 0, victories: 0 };
  const secretWord = payload.metadata?.secretWord;

  return (
    <ModalContent maxWidth="546px">
      <ModalHeader>
        <HStack justifyContent="center">
          <Heading>Estadísticas</Heading>
        </HStack>
      </ModalHeader>
      <ModalBody px="10" pt="10" pb="6">
        <VStack spacing="6" justifyItems="center">
          <HStack spacing="2" w="100%" justifyContent="space-between">
            <VStack spacing="4">
              <Heading>{stats.played}</Heading>
              <Text>Jugadas</Text>
            </VStack>
            <VStack spacing="4">
              <Heading>{stats.victories}</Heading>
              <Text>Victorias</Text>
            </VStack>
          </HStack>

          {secretWord && <Text>LA PALABRA ERA: {secretWord}</Text>}

          <VStack spacing="2">
            <Text>SIGUIENTE PALABRA</Text>
            <Text fontWeight="bold">{nextWordTime}</Text>
          </VStack>

          <Button
            width="264px"
            height="50px"
            bgColor="green.300"
            color="white"
            fontWeight="extrabold"
            fontSize="28px"
            onClick={onSubmit}
          >
            ACEPTAR
          </Button>
        </VStack>
      </ModalBody>
    </ModalContent>
  );
};
