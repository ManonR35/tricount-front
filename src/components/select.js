function Select(array, object, property) {
  return (
    <select
      className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      // onChange={handleChange}
    >
      {array &&
        array.map((object, index) => (
          <option key={index} value={object.property}>
            {object.property}
          </option>
        ))}
    </select>
  );
}

export default Select;
