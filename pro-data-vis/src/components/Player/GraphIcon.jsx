import { chartConfigs, fieldsInfo } from '@/constants/fields';

const GraphIcon = ({ name, color }) => {
  const Icon = fieldsInfo[name].icon;
  const strokeColor = chartConfigs[color].stroke;

  return Icon ? <Icon strokeWidth={2} size={20} color={strokeColor} /> : null;
};

export default GraphIcon;
