import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

// 애니를 넣어서 에러막기 -> 별로 안좋음
// 제너릭 선언을 해서 어떤 타입이든 넣을 수 있게 -> 타입이 정해지면 자동으로 타입이 정해짐

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

export const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

// 변수는 딱히 타입스크립트가 안붙어도됨 하지만 매개변수는 추론을 잘 못해서 추론해줘야함
