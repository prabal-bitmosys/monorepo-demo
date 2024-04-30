"use client";

import { useState, useEffect, useRef } from "react";
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

// type FileCell = {
//   label: string;
//   icon: JSX.Element;
// };

// type emailCell = {
//   label: string;
//   icon?: JSX.Element;
//   button?: JSX.Element;
// };

// type phoneCell = {
//   label: string;
// };

// type firstNameCell = {
//   label: string;
// };

// type lastNameCell = {
//   label: string;
// };

// type subjectCell = {
//   label: string;
// };

// type messageCell = {
//   label: string;
// };

// type termsCell = {
//   label: string;
// };

type Item = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  terms: boolean;
  file?: string;
};

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
  const [domLoaded, setDomLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [item, setItem] = useState<Item[]>([]);

  const fetchUrl = 'http://localhost:4000/api/contact';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${fetchUrl}`);
        if (!response.ok) {
          throw new Error(`ERROR! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setItem(jsonData);
      } catch (error) {
        console.error("Error fetchting data: ", error);
      }
    };
    fetchData();
  }, [fetchUrl]);

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

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "firstName",
      compare: (a, b) => a.firstName.localeCompare(b.firstName),
      renderHeaderCell: () => "First Name",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.firstName}</TableCellLayout>
      ),
    }),
    createTableColumn<Item>({
      columnId: "lastName",
      compare: (a, b) => a.lastName.localeCompare(b.lastName),
      renderHeaderCell: () => "Last Name",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.lastName}</TableCellLayout>
      ),
    }),
    createTableColumn<Item>({
      columnId: "email",
      compare: (a, b) => a.email.localeCompare(b.email),
      renderHeaderCell: () => "Email",
      renderCell: (item) => {
        const copyToClipboard = () => {
          navigator.clipboard.writeText(item.email);
          notify();
          console.log("Email copied to clipboard!");
        };

        return (
          <TableCellLayout truncate>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                }}
              >
                {item.email}
              </span>
              <Button
                appearance="transparent"
                icon={<CopyRegular />}
                onClick={copyToClipboard}
              />
            </div>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "phone",
      compare: (a, b) => {
        const phoneA = a.phone || "";
        const phoneB = b.phone || "";
        return phoneA.localeCompare(phoneB);
      },
      renderHeaderCell: () => "Phone",
      renderCell: (item) => (
        <TableCellLayout truncate>
          {item.phone ?? "Not Specified"}
        </TableCellLayout>
      ),
    }),
    createTableColumn<Item>({
      columnId: "subject",
      compare: (a, b) => a.subject.localeCompare(b.subject),
      renderHeaderCell: () => "Subject",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.subject}</TableCellLayout>
      ),
    }),
    createTableColumn<Item>({
      columnId: "message",
      compare: (a, b) => a.message.localeCompare(b.message),
      renderHeaderCell: () => "Message",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.message}</TableCellLayout>
      ),
    }),
    createTableColumn<Item>({
      columnId: "terms",
      // compare: (a, b) => a.terms.localeCompare(b.terms),
      renderHeaderCell: () => "Terms",
      renderCell: (item) => (
        <TableCellLayout truncate>{item.terms}</TableCellLayout>
      ),
    }),
    createTableColumn<Item>({
      columnId: "file",
      compare: (a, b) => {
        // Handle potential undefined 'file' properties
        const fileA = a.file || "";
        const fileB = b.file || "";
        return fileA.localeCompare(fileB);
      },
      renderHeaderCell: () => "File",
      renderCell: (item) => (
        <TableCellLayout truncate>
          {item.file ?? "Not Specified"}
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

  const refMap = useRef<Record<string, HTMLElement | null>>({});

  return (
    <>
      {domLoaded && (
        <div style={{ overflowX: "auto" }}>
          <DataGrid
            items={item}
            columns={columns}
            sortable
            getRowId={(item) => item.file?.label}
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
                  <strong>First Name:</strong> {selectedItem.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {selectedItem.lastName}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <span>
                    {selectedItem.email}
                    <Button
                      appearance="transparent"
                      icon={<CopyRegular />}
                      onClick={() => {
                        navigator.clipboard.writeText(selectedItem.email);
                        notify(); // Notify the user of the successful copy
                      }}
                      style={{ marginLeft: "8px" }}
                    />
                  </span>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedItem.phone ?? "Not Specified"}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedItem.subject}
                </p>
                <p>
                  <strong>Message:</strong> {selectedItem.message}
                </p>
                <p>
                  <strong>Terms:</strong> {selectedItem.terms}
                </p>
                <p>
                  <strong>File:</strong> {selectedItem.file ?? "Not Specified"}
                </p>
              </>
            ) : (
              <p>No item selected</p>
            )}
          </DrawerBody>
        </OverlayDrawer>
      </div>
      <Toaster position="top" key={toasterId} toasterId={toasterId} />
    </>
  );
};

export default Home;
