import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { useState } from "react";
import SearchBar from ".";
import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import PlusOneIcon from "../icons/PlusOneIcon";

const icons = {
  None: null,
  Search: <SearchIcon />,
  Close: <CloseIcon />,
  PlusOne: <PlusOneIcon />,
};

const meta: Meta<typeof SearchBar> = {
  title: "Design System/Form/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Search here",
    size: "md",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    leftIcon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    leftIcon: <SearchIcon />,
    rightIcon: <PlusOneIcon />,
  },
};

// Size showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <SearchBar
        size="sm"
        placeholder="Search here"
        leftIcon={<SearchIcon />}
        rightIcon={<CloseIcon />}
      />
      <SearchBar
        size="md"
        placeholder="Search here"
        leftIcon={<SearchIcon />}
        rightIcon={<CloseIcon />}
      />
      <SearchBar
        size="lg"
        placeholder="Search here"
        leftIcon={<SearchIcon />}
        rightIcon={<CloseIcon />}
      />
    </div>
  ),
};

// Interactive - controlled by Storybook args
export const InteractiveControlled: StoryFn<typeof SearchBar> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <div className="w-[400px]">
      <SearchBar
        {...args}
        value={value}
        onChange={(e) => {
          updateArgs({ value: e.target.value });
          args.onChange?.(e);
        }}
      />
    </div>
  );
};
InteractiveControlled.args = {
  value: "",
  leftIcon: <SearchIcon />,
  rightIcon: <CloseIcon />,
};

// Interactive - local state (example usage in app)
export const InteractiveLocalState: StoryFn<typeof SearchBar> = (args) => {
  const [value, setValue] = useState("");

  return (
    <div className="w-[400px]">
      <SearchBar
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
InteractiveLocalState.args = {
  size: "md",
  placeholder: "Search here",
  leftIcon: <SearchIcon />,
  rightIcon: <CloseIcon />,
};
