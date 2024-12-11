export const getIntEnv = (value: string): number => (value ? parseInt(value) : null);
export const getBooleanEnv = (value: string): boolean => (value && trullyValues.includes(value) ? true : false);

const trullyValues = ["true", "1", "yes", "y"];