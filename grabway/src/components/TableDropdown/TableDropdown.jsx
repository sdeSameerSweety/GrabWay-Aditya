import React from "react";
import { createPopper } from "@popperjs/core";
import {
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Link,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";

const TableDropdown = () => {
    
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <Popover
        isOpen={dropdownPopoverShow}
        initialFocusRef={btnDropdownRef}
        placement="left-start"
      >
        <PopoverTrigger>
          <Box
            as="a"
            href="#pablo"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
            className="text-blueGray-500 py-1 px-3 cursor-pointer"
          >
            <Icon as={FaEllipsisV} />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          ref={popoverDropdownRef}
          className="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Link
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            >
              Action
            </Link>
            <Link
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            >
              Another action
            </Link>
            <Link
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            >
              Something else here
            </Link>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TableDropdown;
