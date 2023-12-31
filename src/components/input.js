function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      className="
          my-2	
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      type={type}
      defaultValue={value && value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;
