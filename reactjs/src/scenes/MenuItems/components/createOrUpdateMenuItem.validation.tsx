import { L } from '../../../lib/abpUtility';

const rules = {
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  measureUnit: [{ required: true, message: L('ThisFieldIsRequired') }],
  price: [{ required: true, message: L('ThisFieldIsRequired') }],
  category: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;