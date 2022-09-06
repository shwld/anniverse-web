import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

type FormData = {
  name: string;
  description: string;
};

type AnniversaryFormProps = {
  defaultValues?: FormData;
  onSubmit(data: FormData): void;
};

export const AnniversaryFormModal: React.FC<AnniversaryFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FormData>(
    defaultValues ?? { name: '', description: '' }
  );
  return (
    <>
      <Button leftIcon={<EditIcon />} onClick={onOpen}>
        記念日を登録する
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            <ModalHeader>記念日を登録する</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>記念日</FormLabel>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <FormHelperText>
                  「〇〇の日」「クリスマス」など記念日の名前を登録します
                </FormHelperText>
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>説明</FormLabel>
                <Textarea
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <FormHelperText>記念日の説明</FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="teal" type="submit">
                登録する
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

/**
 * PRIVATE
 */
