import { ActionIconGroup, Badge, NumberFormatter, Select, Text } from "@mantine/core";
import { type CrudOperators, useSelect } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { Meta } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { DeleteButton } from "../buttons/DeleteButton";
import { EditButton } from "../buttons/EditButton";
import { ShowButton } from "../buttons/ShowButton";
import { Table } from "./Table";

export default {
  title: 'Tables/Table',
  component: Table,
} satisfies Meta<typeof Table>;

interface ProductRecord {
  id: number;
  name: string;
  description: string;
  price: number;
  material: number;
  category: {
    id: number;
  }
}

interface CategoryRecord {
  id: number;
  title: string;
}

type ProductRecordKey = keyof ProductRecord;

const useTableProps = () => {
  const categories = useSelect<CategoryRecord>({
    resource: "categories",
    optionLabel: category => category.title, 
    optionValue: category => category.id.toString(),
  });

  const categoryMap = useMemo(() =>
    categories.query.data?.data.reduce<Record<string, string>>((acc, cat) => {
      acc[cat.id] = cat.title;
      return acc;
    }, {}) ?? {},
    [categories.query.data]
  );

  const CategoryFilter = useCallback((p: {
    value: string | null;
    onChange: (value: string | null) => void;
  }) => (
    <Select
      data={categories.options}
      value={p.value ?? null}
      onChange={p.onChange}
      comboboxProps={{ withinPortal: false }}
    />
  ), [categories.options]); 

  const columns = useMemo<ColumnDef<ProductRecord>[]>(
    () => [
      {
        id: "name" satisfies ProductRecordKey,
        header: "Name",
        accessorKey: "name" satisfies ProductRecordKey,
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "description" satisfies ProductRecordKey,
        header: "Description",
        accessorKey: "description" satisfies ProductRecordKey,
        enableSorting: false,
        meta: {
          filterOperator: "contains",
        },
        cell: ({ row }) =>
          <Text size="sm" truncate="end" maw={400}>{row.original.description}</Text>
      },
      {
        id: "price" satisfies ProductRecordKey,
        header: "Price",
        accessorKey: "price" satisfies ProductRecordKey,
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) =>
          <NumberFormatter
            suffix=" EUR"
            value={row.original.price}
            thousandSeparator="."
            decimalSeparator=","
            style={{
              whiteSpace: "nowrap",
            }}
          />,
      },
      {
        id: "material" satisfies ProductRecordKey,
        header: "Material",
        accessorKey: "material" satisfies ProductRecordKey,
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "category.id",
        accessorFn: (row) => row.category.id,
        enableColumnFilter: true,
        enableSorting: false,
        header: "Category",
        meta: {
          filterOperator: "eq" satisfies CrudOperators,
          filterElement: CategoryFilter,
        },
        cell: ({ row }) =>
          <Badge size="sm" variant="default">
            {categoryMap[row.original.category.id] ?? "uncategorized"} 
          </Badge>
      },
      {
        id: "id" satisfies ProductRecordKey,
        enableColumnFilter: false,
        enableSorting: false,
        header: "Actions",
        cell: ({ row }) => (
          <ActionIconGroup>
            <ShowButton hideText recordItemId={row.original.id} />
            <EditButton
              hideText
              recordItemId={row.original.id}
            />
            <DeleteButton hideText recordItemId={row.original.id} />
          </ActionIconGroup>
        ),
      },
    ],
    [categoryMap, CategoryFilter],
  );

  const tableProps = useTable<ProductRecord>({
    refineCoreProps: {
      resource: "products",
      pagination: {
        pageSize: 60,
      },
      sorters: {
        initial: [
          {
            field: "price" satisfies ProductRecordKey,
            order: "desc",
          },
        ],
      },
    },
    columns,
  });

  return tableProps;
}

export const Default = () => {
  const tableProps = useTableProps();

  return (
    <Table props={tableProps} />
  );
}

export const Striped = () => {
  const tableProps = useTableProps();

  return (
    <Table props={tableProps} tableProps={{ striped: true }} />
  );
}

export const StickyHeader = () => {
  const tableProps = useTableProps();

  return (
    <Table props={tableProps} tableProps={{ stickyHeader: true }} />
  );
}
