// Import required testing libraries
require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');
const { toHaveNoViolations } = require('jest-axe');

// Configure React Testing Library
configure({ testIdAttribute: 'data-testid' });

// Extend Jest matchers
expect.extend(toHaveNoViolations);