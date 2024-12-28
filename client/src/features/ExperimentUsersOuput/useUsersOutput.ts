import {useEffect, useState} from "react";
import experimentService from "../../services/experimentService.ts";
import {SerializedUser} from "../../utils/types/userTypes/userTypes.ts";
import {UsersOutput} from "./types.ts";

const useUsersOutput = (experimentId: string | undefined, user: SerializedUser) => {
    const [usersOutput, setUsersOutput] = useState<UsersOutput | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!experimentId) {
                setError(true);
                setLoading(false);
                return;
            }
            try {
                const data = await experimentService.getUsersOutput(experimentId, user!);
                if (!data) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                // console.log(data);
                setUsersOutput(reformatData(data, experimentId));
                setLoading(false);

            } catch (error) {
                console.log(error)
                setError(true);
                setLoading(false);
            }


        };

        fetchData();
    }, [experimentId]);

    return {usersOutput, loading, error};
};

function reformatData(data: object[], experimentId: string): UsersOutput {
    const array: string[][] = [];
    const headers = getAllObjectKeys(data);
    array.push(headers);
    createCSVOfArray(data!, headers, array);
    return {experimentId: experimentId, experimentData: array, experimentName: ""};
}

function createCSVOfArray(data: object[], headers: string[], array: string[][]): void {
    for (const obj of data) {
        // Create a row initialized with empty strings
        const row = Array(headers.length).fill('');

        // Function to map nested values based on headers
        const setRowValue = (value: unknown, fullKey: string): void => {
            const index = headers.indexOf(fullKey);
            if (index !== -1) {
                if (Array.isArray(value)) {
                    row[index] = JSON.stringify(value).replace(/,/g, '|');
                    return;
                }
                row[index] = value !== null && value !== undefined ? String(value) : '';
            }
        };

        // Recursive function to handle nested keys and values
        const processObject = (currentObj: unknown, parentKey: string = ''): void => {
            if (currentObj && typeof currentObj === 'object' && !Array.isArray(currentObj)) {
                Object.entries(currentObj).forEach(([key, value]) => {
                    const fullKey = parentKey ? `${parentKey}.${key}` : key;

                    if (value && typeof value === 'object' && !Array.isArray(value)) {
                        // Recursively process nested objects
                        processObject(value, fullKey);
                    } else {
                        // Set value in the row
                        setRowValue(value, fullKey);
                    }
                });
            }
        };

        // Process the current object
        processObject(obj);

        // Add the row to the array
        array.push(row);
    }
}

function getAllObjectKeys<T extends object>(arrayOfObjects: T[] | T | null | undefined): string[] {
    // Handle null/undefined cases
    if (!arrayOfObjects) {
        return [];
    }

    // If single object is passed, convert to array
    const dataArray = Array.isArray(arrayOfObjects) ? arrayOfObjects : [arrayOfObjects];

    // Use Set to automatically handle duplicates
    const uniqueKeys = new Set<string>();

    // Recursive function to traverse nested objects
    const addKeysRecursively = (obj: unknown, parentKey: string = '') => {
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
            Object.entries(obj).forEach(([key, value]) => {
                const fullKey = parentKey ? `${parentKey}.${key}` : key;
                if (key != "output") {
                    uniqueKeys.add(fullKey);
                }

                // Recursively process nested objects
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    addKeysRecursively(value, fullKey);
                }
            });
        }
    };

    // Process each object in the array
    dataArray.forEach(obj => {
        addKeysRecursively(obj);
    });

    // Convert Set back to array
    return Array.from(uniqueKeys);
}

export default useUsersOutput;