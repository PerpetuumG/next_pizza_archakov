import { ProductItem, Ingredient } from '@prisma/client';
import { calcTotalPizzaPrice } from '@/shared/lib/calc-total-pizza-price';
import { mapPizzaType, PizzaType, PizzaSize } from '@/shared/constants/pizza';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetails };
};
