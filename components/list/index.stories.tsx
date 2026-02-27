import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { List, ListItem } from '.';
import Home from '../icons/HomeIcon';
import PlusOneIcon from '../icons/PlusOneIcon';

const icons = {
  None: null,
  Home: <Home />,
  PlusOne: <PlusOneIcon className="w-4! h-4!" />,
};

const meta: Meta<typeof ListItem> = {
  title: 'Design System/Display/List',
  component: ListItem,
  parameters: { layout: 'padded' },
  args: {
    title: 'Lorem ipsum dolor, sit amet consectetur',
    description: 'List Item',
  },
  argTypes: {
    leftIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Selectable: StoryFn<typeof ListItem> = () => {
  const [selected, setSelected] = useState<number[]>([1]);

  const items = [
    { value: 1, label: 'List item - 1' },
    { value: 2, label: 'List item - 2' },
    { value: 3, label: 'List item - 3' },
  ];

  return (
    <div className="w-[620px]">
      <div className="rounded-md border border-content-secondary/20 p-4">
        <List>
          {items.map((item) => {
            const isSelected = selected.includes(item.value);

            return (
              <ListItem
                key={item.value}
                title={item.label}
                description={undefined}
                isSelected={isSelected}
                onClick={() => setSelected([item.value])}
              />
            );
          })}
        </List>

        <div className="mt-4 text-[14px] text-content-secondary">
          Selected value:{' '}
          <span className="text-black">[{selected.join(', ')}]</span>
        </div>
      </div>
    </div>
  );
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-[320px] rounded-lg border border-content-secondary/20 p-3">
      <List>
        <ListItem
          title="List Item"
          description="List Item"
          leftIcon={<Home />}
        />
        <ListItem
          title="List Item"
          description="List Item"
          leftIcon={<Home />}
          rightIcon={<Home />}
        />
        <ListItem title="List Item" leftIcon={<Home />} rightIcon={<Home />} />
      </List>
    </div>
  ),
};
