import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentType, SVGProps } from 'react';

import ArrowDownIcon from './ArrowDownIcon';
import ArrowLeftIcon from './ArrowLeftIcon';
import ArrowRightIcon from './ArrowRightIcon';
import ArrowUpIcon from './ArrowUpIcon';
import FireIcon from './FireIcon';
import LoaderIcon from './LoaderIcon';
import LocationIcon from './LocationIcon';
import MailIcon from './MailIcon';
import PhoneIcon from './PhoneIcon';
import ShareIcon from './ShareIcon';
import ShareOutIcon from './ShareOutIcon';
import StarIcon from './StarIcon';
import ThumbDownIcon from './ThumbDownIcon';
import ThumbUpIcon from './ThumbUpIcon';
import VerifiedIcon from './VerifiedIcon';

type IconProps = SVGProps<SVGSVGElement>;

type IconEntry = { name: string; Component: ComponentType<IconProps> };

const icons: IconEntry[] = [
  { name: 'FireIcon', Component: FireIcon },
  { name: 'ArrowUpIcon', Component: ArrowUpIcon },
  { name: 'ArrowDownIcon', Component: ArrowDownIcon },
  { name: 'ArrowLeftIcon', Component: ArrowLeftIcon },
  { name: 'ArrowRightIcon', Component: ArrowRightIcon },
  { name: 'LocationIcon', Component: LocationIcon },
  { name: 'ThumbUpIcon', Component: ThumbUpIcon },
  { name: 'ThumbDownIcon', Component: ThumbDownIcon },
  { name: 'PhoneIcon', Component: PhoneIcon },
  { name: 'MailIcon', Component: MailIcon },
  { name: 'ShareIcon', Component: ShareIcon },
  { name: 'ShareOutIcon', Component: ShareOutIcon },
  { name: 'VerifiedIcon', Component: VerifiedIcon },
  { name: 'StarIcon', Component: StarIcon },
  { name: 'LoaderIcon', Component: LoaderIcon },
];

type GalleryProps = {
  size: number;
  iconClassName: string;
  showLabels: boolean;
  columns: number;
};

function IconsGallery({
  size,
  iconClassName,
  showLabels,
  columns,
}: GalleryProps) {
  const gridTemplateColumns = `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Icons We Used</h3>
        <span className="text-xs text-slate-500">{icons.length} icons</span>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns }}>
        {icons.map(({ name, Component }) => (
          <div
            key={name}
            className="flex flex-col items-center rounded-lg border border-slate-100 bg-white p-3"
          >
            <div className="flex items-center justify-center rounded-md bg-slate-50 w-12 h-12">
              <Component
                className={iconClassName}
                style={{ width: size, height: size }}
              />
            </div>

            {showLabels ? (
              <div className="mt-2 text-center text-[11px] font-medium text-slate-700">
                {name}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<GalleryProps> = {
  title: 'Design System/Display/Icons',
  component: IconsGallery,
  parameters: {
    layout: 'padded',
    docs: { story: { inline: false, iframeHeight: 650 } },
  },
  args: {
    size: 24,
    iconClassName: 'text-neutral-500',
    showLabels: true,
    columns: 8,
  },
  argTypes: {
    size: { control: { type: 'number', min: 24, max: 48, step: 4 } },
    columns: { control: { type: 'number', min: 4, max: 14, step: 1 } },
    showLabels: { control: 'boolean' },
    iconClassName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<GalleryProps>;

export const Playground: Story = {};

export const Compact: Story = {
  args: { size: 36, columns: 14, showLabels: false },
};
