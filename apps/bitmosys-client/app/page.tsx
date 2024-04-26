"use client";

import * as React from "react";
import { DocumentRegular, Dismiss24Regular } from "@fluentui/react-icons";
import {
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  OverlayDrawer,
  Drawer,
  DrawerProps,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuItem,
} from "@fluentui/react-components";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type emailCell = {
  label: string;
};

type phoneCell = {
  label: string;
  icon?: JSX.Element;
};

type firstNameCell = {
  label: string;
};

type lastNameCell = {
  label: string;
};

type subjectCell = {
  label: string;
};

type messageCell = {
  label: string;
};

type termsCell = {
  label: string;
};

type Item = {
  file: FileCell;
  firstName: firstNameCell;
  lastName: lastNameCell;
  email: emailCell;
  phone: phoneCell;
  subject: subjectCell;
  message: messageCell;
  terms: termsCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    firstName: { label: "Max" },
    lastName: { label: "Doe" },
    email: { label: "test@mail.com" },
    phone: {
      label: "1234567890",
    },
    subject: { label: "TEST" },
    message: { label: "TEST" },
    terms: { label: "true" },
  },
  {
    file: { label: "Thursday presentation", icon: <DocumentRegular /> },
    firstName: { label: "Erika" },
    lastName: { label: "Doe" },
    email: { label: "test@mail.com" },
    phone: {
      label: "1234567890",
    },
    subject: { label: "TEST" },
    message: {
      label:
        "sadfadsgasdgas dfgasdfgasdgfalkdsfjj l al;sdj fl;ajsl;djf ;laksdjf alskdjfla;skdj fl;ajskdfl;",
    },
    terms: { label: "true" },
  },
  {
    file: { label: "Training recording", icon: <DocumentRegular /> },
    firstName: { label: "John" },
    lastName: { label: "Doe" },
    email: { label: "test@mail.com" },
    phone: {
      label: "1234567890",
    },
    subject: { label: "TEST" },
    message: { label: "TEST" },
    terms: { label: "true" },
  },
  {
    file: { label: "Purchase order", icon: <DocumentRegular /> },
    firstName: { label: "Jane" },
    lastName: { label: "Doe" },
    email: { label: "test@mail.com" },
    phone: {
      label: "1234567890",
    },
    subject: { label: "TEST" },
    message: { label: "TEST" },
    terms: { label: "true" },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "firstName",
    compare: (a, b) => a.firstName.label.localeCompare(b.firstName.label),
    renderHeaderCell: () => "First Name",
    renderCell: (item) => (
      <TableCellLayout truncate>{item.firstName.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "lastName",
    compare: (a, b) => a.lastName.label.localeCompare(b.lastName.label),
    renderHeaderCell: () => "Last Name",
    renderCell: (item) => (
      <TableCellLayout truncate>{item.lastName.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "email",
    compare: (a, b) => a.email.label.localeCompare(b.email.label),
    renderHeaderCell: () => "Email",
    renderCell: (item) => (
      <TableCellLayout truncate>{item.email.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "phone",
    compare: (a, b) => a.phone.label.localeCompare(b.phone.label),
    renderHeaderCell: () => "Phone",
    renderCell: (item) => (
      <TableCellLayout truncate media={item.phone.icon}>
        {item.phone.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "subject",
    compare: (a, b) => a.subject.label.localeCompare(b.subject.label),
    renderHeaderCell: () => "Subject",
    renderCell: (item) => (
      <TableCellLayout truncate>{item.subject.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "message",
    compare: (a, b) => a.message.label.localeCompare(b.message.label),
    renderHeaderCell: () => "Message",
    renderCell: (item) => (
      <TableCellLayout truncate>{item.message.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "terms",
    compare: (a, b) => a.terms.label.localeCompare(b.terms.label),
    renderHeaderCell: () => "Terms",
    renderCell: (item) => (
      <TableCellLayout truncate>{item.terms.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "File",
    renderCell: (item) => (
      <TableCellLayout truncate media={item.file.icon}>
        {item.file.label}
      </TableCellLayout>
    ),
  }),
];

const columnSizingOptions = {
  file: {
    minWidth: 80,
    defaultWidth: 180,
    idealWidth: 200,
  },
  firstName: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  lastName: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  email: {
    defaultWidth: 200,
    minWidth: 120,
    idealWidth: 280,
  },
  phone: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  subject: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  message: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  terms: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
};

const Home = () => {
  const [domLoaded, setDomLoaded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  return (
    <>
      {domLoaded && (
        <div style={{ overflowX: "auto" }}>
          {/* Sidebar nav panel */}
          <Drawer
            type="overlay"
            separator
            open={isOpen}
            onOpenChange={(_, { open }) => setIsOpen(open)}
          >
            <DrawerHeader>
              <DrawerHeaderTitle
                action={
                  <Button
                    appearance="subtle"
                    aria-label="Close"
                    icon={<Dismiss24Regular />}
                    onClick={() => setIsOpen(false)}
                  />
                }
              >
                Default Drawer
              </DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody>
              <p>Drawer content</p>
            </DrawerBody>
          </Drawer>
          {/* End of Sidebar nav panel */}
          <DataGrid
            items={items}
            columns={columns}
            sortable
            getRowId={(item) => item.file.label}
            selectionMode="multiselect"
            resizableColumns
            columnSizingOptions={columnSizingOptions}
          >
            <DataGridHeader>
              <DataGridRow
                selectionCell={{
                  checkboxIndicator: { "aria-label": "Select all rows" },
                }}
              >
                {({ renderHeaderCell, columnId }, dataGrid) =>
                  dataGrid.resizableColumns ? (
                    <Menu openOnContext>
                      <MenuTrigger>
                        <DataGridHeaderCell
                          ref={(el) => {
                            refMap.current[columnId] = el;
                          }}
                        >
                          {renderHeaderCell()}
                        </DataGridHeaderCell>
                      </MenuTrigger>
                      <MenuPopover>
                        <MenuList>
                          <MenuItem
                            onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(
                              columnId
                            )}
                          >
                            Keyboard Column Resizing
                          </MenuItem>
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  ) : (
                    <DataGridHeaderCell>
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  )
                }
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<Item>>
              {({ item, rowId }) => (
                <DataGridRow<Item>
                  key={rowId}
                  selectionCell={{
                    checkboxIndicator: { "aria-label": "Select row" },
                  }}
                >
                  {({ renderCell }) => (
                    <DataGridCell
                      onClick={() => {
                        setIsOpen(!isOpen);
                        console.log("CLICKED!!!!!");
                      }}
                    >
                      {renderCell(item)}
                    </DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </div>
      )}
    </>
  );
};

export default Home;
