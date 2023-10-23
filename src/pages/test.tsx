import SelectInput from "@/components/fragments/Select";

const TestPage = () => {
  return (
    <div className="flex flex-col font-poppins px-3">
      <div className="px-8">
        <SelectInput name="test" id="test" label="test">
            <option value="1">satu</option>
            <option value="1">satu</option>
            <option value="1">satu</option>
        </SelectInput>
      </div>
    </div>
  );
};
export default TestPage;
