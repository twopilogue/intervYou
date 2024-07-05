import { Meta, StoryObj } from "@storybook/react/*";
import { InputField } from "../src/app/_components/input/InputField";

const meta: Meta<typeof InputField> = {
  title: "Example/Input",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

export const Input: Story = {
  args: {
    name: "input",
    placeholder: "내용을 입력하세요.",
  },
};

export const InputWithLabel: Story = {
  args: {
    name: "input",
    label: "닉네임",
    placeholder: "내용을 입력하세요.",
  },
};
