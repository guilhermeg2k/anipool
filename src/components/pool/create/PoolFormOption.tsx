import DataDisplay from '@components/core/DataDisplay';
import FormGroup from '@components/core/FormGroup';
import TrashIcon from '@heroicons/react/outline/TrashIcon';

interface PoolFormOptionProps {
  id: string;
  type: string;
  text: string;
}

const PoolFormOption = ({ id, type, text }: PoolFormOptionProps) => {
  return (
    <FormGroup id={id} className="flex flex-col sm:flex-row" label="#1 Option">
      <DataDisplay className="flex w-full items-center justify-center sm:w-[180px]">
        {type}
      </DataDisplay>
      <DataDisplay className="flex w-full items-center justify-between uppercase">
        <span>{text}</span>
        <button>
          <TrashIcon className="h-5 w-5 text-red-600" />
        </button>
      </DataDisplay>
    </FormGroup>
  );
};

export default PoolFormOption;
