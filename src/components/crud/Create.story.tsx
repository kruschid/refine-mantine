import { Box, NumberInput, Select, SimpleGrid, Textarea, TextInput } from "@mantine/core";
import { useSelect } from "@refinedev/core";
import { IconCurrencyEuro } from "@tabler/icons-react";
import { useForm } from "@/hooks/useForm";
import { Create } from "./Create";

export default {
  title: 'Crud/Create',
  component: Create,
};

interface Category {
  id: number;
  title: string;
}

export const Default = () => {
  const {
    refineCore: { formLoading },
    getInputProps,
    saveButtonProps,
  } = useForm({
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
    debounce: 500,
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
      resource="products"
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
    </Create>
  );
}
