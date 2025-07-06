import { useEffect, useState, useRef } from "react"; // Import useRef
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { projectFirestore } from "../firebase/config";

export const useCollection = (collectionName, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    
    const queryRef = useRef(_query);
    const orderByRef = useRef(_orderBy);

    
    useEffect(() => {
        queryRef.current = _query;
        orderByRef.current = _orderBy;
    }, [_query, _orderBy]);


    useEffect(() => {
        setIsPending(true);

        let collectionRef = collection(projectFirestore, collectionName);
        let q = collectionRef;

        
        if (queryRef.current) { 
            q = query(q, where(...queryRef.current));
        }

        
        if (orderByRef.current) { 
            q = query(q, orderBy(...orderByRef.current));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            });

            setDocuments(results);
            setError(null);
            setIsPending(false);
        }, (err) => {
            console.error("Firestore onSnapshot error:", err.message);
            setError('Could not fetch the data: ' + err.message);
            setIsPending(false);
        });

        return () => unsubscribe();

    }, [collectionName]); 

    return { documents, error, isPending }
}