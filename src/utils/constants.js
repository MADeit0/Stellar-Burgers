const baseUrl = "https://norma.nomoreparties.space/api";
const wsUrl = "wss://norma.nomoreparties.space/orders";

const ingredientsMenu = { BUN: "bun", SAUCE: "sauce", MAIN: "main" };

const ItemTypes = {
  INGREDIENTS: "ingredients",
  CARD: "card",
};

const token = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

const message = {
  JWT_EXPIRED: "jwt expired",
  INVALID_TOKEN: "invalid token",
};

const statusDic = {
  pending: { status: "Готовится", color: "while" },
  created: { status: "Создан", color: "while" },
  done: { status: "Выполнен", color: "#00CCCC" },
};

export { baseUrl, wsUrl, ingredientsMenu, ItemTypes, token, message, statusDic };
