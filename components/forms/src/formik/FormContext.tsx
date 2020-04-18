import React from 'react';

// Exported to own file to avoid circular dependency
const FormContext = React.createContext({ limitRerender: false });

export default FormContext;
