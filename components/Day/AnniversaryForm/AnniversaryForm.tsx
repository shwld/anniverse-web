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
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

type FormData = {
  name: string;
  description: string;
  author: string;
  authorUrl: string;
};

type AnniversaryFormProps = {
  disabled?: boolean;
  defaultValues?: FormData;
  onSubmit(data: FormData): void;
};

export const AnniversaryFormModal: React.FC<AnniversaryFormProps> = ({
  disabled,
  defaultValues,
  onSubmit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FormData>(
    defaultValues ?? { name: '', description: '', author: '', authorUrl: '' }
  );
  return (
    <>
      <Button disabled={disabled} leftIcon={<EditIcon />} onClick={onOpen}>
        記念日を制定する
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
              onClose();
            }}
          >
            <ModalHeader>記念日を制定する</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack gap="3">
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
                <FormControl>
                  <FormLabel>祝日制定者の名前</FormLabel>
                  <Input
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                  <FormHelperText>
                    「@shwld」など制定した人の名前を入力すると、カレンダーに表示されます
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>祝日制定者のURL</FormLabel>
                  <Input
                    onChange={(e) =>
                      setFormData({ ...formData, authorUrl: e.target.value })
                    }
                  />
                  <FormHelperText>
                    「https://twitter.com/shwld」など制定者のプロフィールへのリンクを設定できます
                  </FormHelperText>
                </FormControl>
              </Stack>
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
