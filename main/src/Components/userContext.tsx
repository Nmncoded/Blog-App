import React from 'react';
import { userContextType } from './typesDefined';

let UserContext = React.createContext<userContextType| null>(null);

export default UserContext; 