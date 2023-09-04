import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FcList } from "react-icons/fc";

const TableDropdown = () => {
  return (
    <Popover>
      {({ isOpen, onOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              aria-label="Options"
              icon={<FcList />}
              onClick={isOpen ? onClose : onOpen}
              size="sm"
              colorScheme="blueGray"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Text
                as="a"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                display="block"
                py={2}
                px={4}
                fontWeight="normal"
                fontSize="sm"
                whiteSpace="nowrap"
                color="blueGray.700"
              >
                Action
              </Text>
              <Text
                as="a"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                display="block"
                py={2}
                px={4}
                fontWeight="normal"
                fontSize="sm"
                whiteSpace="nowrap"
                color="blueGray.700"
              >
                Another action
              </Text>
              <Text
                as="a"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                display="block"
                py={2}
                px={4}
                fontWeight="normal"
                fontSize="sm"
                whiteSpace="nowrap"
                color="blueGray.700"
              >
                Something else here
              </Text>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default TableDropdown;
