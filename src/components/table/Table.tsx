import { Box, Group, Table as MantineTable, Pagination } from "@mantine/core";
import type { BaseRecord, HttpError } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { ColumnFilter } from "./ColumnFilter";
import { ColumnSorter } from "./ColumnSorter";

export const Table = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
>({
  props,
}: {
  props: UseTableReturnType<TData, TError>;
}) => (
  <>
    <MantineTable.ScrollContainer minWidth={500}>
      <MantineTable highlightOnHover>
        <MantineTable.Thead>
          {props.reactTable.getHeaderGroups().map((headerGroup) => (
            <MantineTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <MantineTable.Th key={header.id}>
                  {!header.isPlaceholder && (
                    <Group gap="xs" wrap="nowrap">
                      <Box>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Box>
                      <Group gap="xs" wrap="nowrap">
                        <ColumnSorter column={header.column} />
                        <ColumnFilter column={header.column} />
                      </Group>
                    </Group>
                  )}
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {props.reactTable.getRowModel().rows.map((row) => (
            <MantineTable.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <MantineTable.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </MantineTable.Td>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
    </MantineTable.ScrollContainer>
    <Group justify="flex-end" mt="xl">
      <Pagination
        total={props.refineCore.pageCount}
        value={props.refineCore.currentPage}
        onChange={props.refineCore.setCurrentPage}
      />
    </Group>
  </>
);
