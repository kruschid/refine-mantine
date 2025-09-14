import { Box, NumberInput, Select, SimpleGrid, Textarea, TextInput } from "@mantine/core";
import { useSelect } from "@refinedev/core";
import { IconCurrencyEuro } from "@tabler/icons-react";
import { useForm } from "@/hooks/useForm";
import { Edit } from "./Edit";

export default {
  title: 'Crud/Edit',
  component: Edit,
};

interface Category {
  id: number;
  title: string;
}

export const Default = () => {
  const {
    values,
    refineCore: { formLoading },
    getInputProps,
    saveButtonProps,
  } = useForm({
    refineCoreProps: {
      // [WORKAROUND-START]
      // these hardcoded params are only for demonstration purpose, please don't use these in your app
      resource: "products",
      id: 11,
      action: "edit",
      // [WORKAROUND-END]
    },
    initialValues: {
      name: "",
      description: "",
      price: 0,
      material: "",
      category: {
        id: null
      },
    },
  });

  const { options, onSearch } = useSelect<Category>({
    resource: "categories",
    optionLabel: category => category.title, 
    optionValue: category => category.id.toString(),
    debounce: 200,
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <SimpleGrid cols={2}>
        <Box>
          <TextInput
            label="Name"
            mb="sm"
            {...getInputProps("name")}
          />
          <NumberInput
            label="Price"
            mb="sm"
            rightSection={<IconCurrencyEuro size={18}/>}
            {...getInputProps("price")}
          />
          <TextInput
            label="Material"
            mb="sm"
            {...getInputProps("material")}
          />
          <Select
            label="Category"
            data={options}
            searchable
            onSearchChange={onSearch}
            {...getInputProps("category.id")}
            value={String(values.category.id)}
          />
        </Box>
        <Box>
          <Textarea
            label="Description"
            rows={6}
            {...getInputProps("description")}
          />
        </Box>
      </SimpleGrid>
    </Edit>
  );
}

export const WithAutoSave = () => {
const {
    values,
    refineCore: { autoSaveProps },
    getInputProps,
    saveButtonProps,
  } = useForm({
    refineCoreProps: {
      autoSave: {
        enabled: true,
        debounce: 1000,
      },
      // [WORKAROUND-START]
      // these hardcoded params are only for demonstration purpose, please don't use these in your app
      resource: "products",
      id: 11,
      action: "edit",
      // [WORKAROUND-END]
    },
    initialValues: {
      name: "",
      description: "",
      price: 0,
      material: "",
      category: {
        id: null
      },
    },
  });

  const { options, onSearch } = useSelect<Category>({
    resource: "categories",
    optionLabel: category => category.title, 
    optionValue: category => category.id.toString(),
    debounce: 200,
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      autoSaveProps={autoSaveProps}
    >
      <SimpleGrid cols={2}>
        <Box>
          <TextInput
            label="Name"
            mb="sm"
            {...getInputProps("name")}
          />
          <NumberInput
            label="Price"
            mb="sm"
            rightSection={<IconCurrencyEuro  size={18}/>}
            {...getInputProps("price")}
          />
          <TextInput
            label="Material"
            mb="sm"
            {...getInputProps("material")}
          />
          <Select
            label="Category"
            data={options}
            searchable
            onSearchChange={onSearch}
            {...getInputProps("category.id")}
            value={String(values.category.id)}
          />
        </Box>
        <Box>
          <Textarea
            label="Description"
            rows={6}
            {...getInputProps("description")}
          />
        </Box>
      </SimpleGrid>
    </Edit>
  );
}
