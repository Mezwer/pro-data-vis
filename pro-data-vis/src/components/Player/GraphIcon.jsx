import { descriptions } from '@/constants/fields';

const GraphIcon = ({ name }) => {
  const Icon = descriptions[name]?.icon;

  return Icon ? <Icon strokeWidth={1} size={20} /> : null;
};

export default GraphIcon;
