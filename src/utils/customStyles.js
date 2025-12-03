export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    backgroundColor: "#fff",
    // textTransform: "capitalize",
    width: "100%",
    minWidth: "100%",
  }),
  

  option: (provided,state) => ({
    ...provided,
    color: state.data?.isDisabled ? "red" : "#333",
    cursor: state.data?.isDisabled ? "not-allowed" : provided.cursor,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  menuPortal: base => ({ ...base, zIndex: 999999  }),
  menuList: (base) => ({
    ...base,
     maxHeight: '200px',
       overflowY: 'auto',
    "::-webkit-scrollbar": {
      width: "1px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
    
  }),
  valueContainer: (provided) => ({
    ...provided,
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexWrap: 'wrap',
  }),
  
  multiValue: (provided) => ({
    ...provided,
    maxWidth: '90%',
    overflow: 'hidden',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px',
  }),
  
  singleValue: (provided) => ({
    ...provided,
    color: "#3A3A3A",
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#808080",
    textOverflow: 'Ellipsis',
  }),
  input: (provided) => ({
    ...provided,
    color: "#808080",
    textAlign: "left",
    caretColor: "auto"

  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 99999
  }),
  
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
};
export const customIconSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    borderWidth: 2,
    borderColor: "#1E3964",
    borderRadius: "9999px",
    backgroundColor: "#fff",
    textTransform: "capitalize",
  }),

  option: (provided) => ({
    ...provided,
    color: "#333",
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "200px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#3A3A3A",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#808080",
  }),
  input: (provided) => ({
    ...provided,
    color: "#808080",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
};
