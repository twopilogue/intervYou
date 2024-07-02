import { Meta, StoryObj } from "@storybook/react/*";
import { SearchField } from "../pages/_components/input/SearchField";

const meta: Meta<typeof SearchField> = {
  title: "Example/Search",
  component: SearchField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
  },
};
