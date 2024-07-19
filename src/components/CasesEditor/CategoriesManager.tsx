import { useCallback, useEffect, useState } from "react";
import update from 'immutability-helper';
import { TCasesSpace, TCasesValue, TCategoryEntry } from "./types";
import { buildCategories } from "./func";
import { CategoryCard } from "./CategoryCard";

export const CategoriesManager = <Space extends TCasesSpace>({ value, casesValue, onValueChange }: {
    casesValue: TCasesValue<Space>;
    value: TCategoryEntry[];
    onValueChange: (newValue: TCategoryEntry[]) => void;
}) => {
    const [order, setOrder] = useState(value);

    useEffect(() => {
        setOrder(value);
    }, [value]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setOrder(prevOrder => update(prevOrder, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevOrder[dragIndex] as TCategoryEntry],
            ],
        }));
    }, []);

    const renderCard = useCallback(
        (card: TCategoryEntry, index: number) => {
            return (
                <CategoryCard
                    key={card[0]}
                    index={index}
                    id={card[0]}
                    moveCard={moveCard}
                    onDrop={() => {
                        onValueChange(order)
                    }}
                >{index + 1}: {card[0]}</CategoryCard>
            );
        },
        [onValueChange, order],
    );

    return <div className="flex flex-col gap-2 border p-2">
        {order.map((card, i) => renderCard(card, i))}
    </div>;
};