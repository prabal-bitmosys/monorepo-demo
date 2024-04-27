"use client";

import * as React from "react";
import {
  DocumentRegular,
  CopyRegular,
  Dismiss24Filled,
  Dismiss24Regular,
  OpenRegular,
} from "@fluentui/react-icons";
import {
  Button,
  useId,
  Link,
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
  Toaster,
  useToastController,
  ToastTitle,
  ToastTrigger,
  Toast,
  ToastBody,
} from "@fluentui/react-components";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type emailCell = {
  label: string;
  icon?: JSX.Element;
  button?: JSX.Element;
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
  firstName: firstNameCell;
  lastName: lastNameCell;
  email: emailCell;
  phone?: phoneCell;
  subject: subjectCell;
  message: messageCell;
  terms: termsCell;
  file?: FileCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    firstName: { label: "Max" },
    lastName: { label: "Doe" },
    email: {
      label: "test@mail.com",
      icon: <CopyRegular />,
      button: <Button>Copy</Button>,
    },
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
    email: { label: "test2@mail.com", icon: <CopyRegular /> },
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
    email: { label: "test3@mail.com", icon: <CopyRegular /> },
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
    email: { label: "test4@mail.com", icon: <CopyRegular /> },
    phone: {
      label: "1234567890",
    },
    subject: { label: "TEST" },
    message: { label: "TEST" },
    terms: { label: "true" },
  },
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
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const [domLoaded, setDomLoaded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          key={"Success Toast"}
          action={
            <ToastTrigger>
              <Link>
                <Dismiss24Filled />
              </Link>
            </ToastTrigger>
          }
        >
          Copied to Clipboard
        </ToastTitle>
      </Toast>,
      { intent: "success" }
    );

  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

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
      renderCell: (item) => {
        const copyToClipboard = () => {
          navigator.clipboard.writeText(item.email.label);
          notify();
          console.log("Email copied to clipboard!");
        };

        return (
          <TableCellLayout truncate>
            {item.email.label}
            <Button
              appearance="transparent"
              icon={<CopyRegular />}
              onClick={() => {
                copyToClipboard();
              }}
              style={{ marginLeft: "8px" }}
            />
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "phone",
      compare: (a, b) => {
        const phoneA = a.phone?.label || "";
        const phoneB = b.phone?.label || "";
        return phoneA.localeCompare(phoneB);
      },
      renderHeaderCell: () => "Phone",
      renderCell: (item) => (
        <TableCellLayout truncate media={item.phone?.icon}>
          {item.phone?.label ?? "Not Specified"}
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
      compare: (a, b) => {
        // Handle potential undefined 'file' properties
        const fileA = a.file?.label || "";
        const fileB = b.file?.label || "";
        return fileA.localeCompare(fileB);
      },
      renderHeaderCell: () => "File",
      renderCell: (item) => (
        <TableCellLayout truncate media={item.file?.icon}>
          {item.file?.label ?? "Not Specified"}
        </TableCellLayout>
      ),
    }),

    createTableColumn<Item>({
      columnId: "Action",
      renderHeaderCell: () => {
        return "Action";
      },
      renderCell: (item) => {
        return (
          <Button
            onClick={() => {
              setSelectedItem(item);
              setIsOpen(!isOpen);
            }}
            icon={<OpenRegular />}
          >
            Open
          </Button>
        );
      },
    }),
  ];

  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  return (
    <>
      {domLoaded && (
        <div style={{ overflowX: "auto" }}>
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
                    <DataGridCell>{renderCell(item)}</DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </div>
      )}
      <div>
        <OverlayDrawer
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
          style={{ width: "600px" }}
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
              Form Data
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            {selectedItem ? (
              <>
                <p>
                  <strong>First Name:</strong> {selectedItem.firstName.label}
                </p>
                <p>
                  <strong>Last Name:</strong> {selectedItem.lastName.label}
                </p>
                <p>
                  <strong>Email:</strong> {selectedItem.email.label}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedItem.phone?.label ?? "Not Specified"}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedItem.subject.label}
                </p>
                <p>
                  <strong>Message:</strong> {selectedItem.message.label}
                </p>
                <p>
                  <strong>Terms:</strong> {selectedItem.terms.label}
                </p>
                <p>
                  <strong>File:</strong>{" "}
                  {selectedItem.file?.label ?? "Not Specified"}
                </p>
              </>
            ) : (
              <p>No item selected</p>
            )}
          </DrawerBody>
        </OverlayDrawer>

        {/* <Button appearance="primary" onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button> */}
      </div>
      <Toaster position="top" key={toasterId} toasterId={toasterId} />
    </>
  );
};

export default Home;
