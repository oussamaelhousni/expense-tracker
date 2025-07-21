import { firestore } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchData = function <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!collectionName) return;
    const collectitonRef = collection(firestore, collectionName);
    const q = query(collectitonRef, ...constraints);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as T[];
        setData(fetchedData);
        setIsLoading(false);
      },
      (error) => {
        console.log("error", error);
        setIsLoading(false);
        setError(error.message);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return { data, isLoading, error };
};

export default useFetchData;
