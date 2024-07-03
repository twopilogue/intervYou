import { Meta, StoryObj } from "@storybook/react/*";
import { TextArea } from "../src/app/_components/input/TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Example/TextArea",
  component: TextArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const TextAreaField: Story = {
  args: {
    placeholder: "내용을 입력해주세요.",
  },
};

export const TextAreaWithLabel: Story = {
  args: {
    name: "label",
    label: "내용",
    placeholder: "내용을 입력해주세요.",
  },
};
