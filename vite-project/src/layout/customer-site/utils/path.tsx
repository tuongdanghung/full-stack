const path = {
    PUBLIC: "/",
    HOME: "",
    ALL: "*",
    LOGIN: "login",
    PRODUCTS: "product",
    PRODUCTS_CATEGORY: "product/:slug",
    PRODUCT_DETAIL: "product/:slug/:id",
    BLOG_DETAIL: "blog/:id",
    CART: "cart",
    CHECKOUT: "checkout",
    BLOG: "blog",
    MYPROFILE: "profile",
    HISTORY: "history-order",
    CONTACT: "contact",
    FINALREGISTER: "finalregister/:status",
    VERIFY_ACCOUNT: "verifyAccount/:id",
    VERIFY_GOOGLE: "verifyGoogle/:token/V1",
    FAVORITE: "favorite",
    FORGOT: "reset-password/:token",
};

export default path;
