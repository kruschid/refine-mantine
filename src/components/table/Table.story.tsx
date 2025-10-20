import { Badge, NumberFormatter, Select, Text } from "@mantine/core";
import { type CrudOperators, useSelect } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type { Meta } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
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

export const Default = () => {
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
      label="Category"
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

  return (
    <Table props={tableProps} />
  );
}
