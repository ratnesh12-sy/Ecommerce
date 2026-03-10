const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Centralized fetch wrapper that:
 * - Prepends the backend API base URL
 * - Attaches JWT Bearer token from localStorage (if available)
 * - Sets Content-Type to application/json for request bodies
 */
export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("emart_token") : null;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        // Explicit 401 / 403 handling for clear debugging
        if (response.status === 401) {
            console.warn(`[apiFetch] 401 Unauthorized on ${path} — token may be missing or expired.`);
            if (typeof window !== "undefined") localStorage.removeItem("emart_token");
            throw new Error("Unauthorized (401): Please log in again.");
        }
        if (response.status === 403) {
            console.warn(`[apiFetch] 403 Forbidden on ${path} — insufficient permissions.`);
            throw new Error("Forbidden (403): You do not have permission for this action.");
        }

        let errorMessage = `Request failed with status ${response.status}`;
        try {
            const errorBody = await response.text();
            if (errorBody) {
                try {
                    const parsed = JSON.parse(errorBody);
                    errorMessage = parsed.message || errorBody;
                } catch {
                    errorMessage = errorBody;
                }
            }
        } catch {
            // ignore parse errors
        }

        const friendlyMessages: Record<string, string> = {
            "Bad credentials": "Invalid email or password. Please try again.",
            "Email is already exists!.": "This email is already registered. Please log in instead.",
            "Firebase authentication failed": "Authentication failed. Please try again.",
            "Phone number not found in Firebase token.": "Could not verify your phone number. Please try again.",
        };

        throw new Error(friendlyMessages[errorMessage] || errorMessage);
    }

    // Handle 204 No Content or empty bodies
    const contentType = response.headers.get("content-type");
    if (
        response.status === 204 ||
        !contentType ||
        !contentType.includes("application/json")
    ) {
        return (await response.text()) as unknown as T;
    }

    return response.json();
}

// ─── Auth API ────────────────────────────────────────────────

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
}

/** Email + Password Login */
export function loginAPI(email: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

/** Email + Password Register */
export function registerAPI(name: string, email: string, password: string): Promise<string> {
    return apiFetch<string>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}

/** Firebase Phone OTP Login — exchange Firebase ID token for backend JWT */
export function firebaseLoginAPI(idToken: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/firebase-login", {
        method: "POST",
        body: JSON.stringify({ idToken }),
    });
}

// ─── User Profile API ───────────────────────────────────────

export interface UserProfileResponse {
    id: number;
    name: string;
    email: string | null;
    mobileNumber: string | null;
    membershipLevel: string;
    loyaltyPoints: number;
    walletBalance: number;
    roles: string[];
    createdAt: string;
}

export interface UpdateProfileRequest {
    name?: string;
    email?: string;
    mobileNumber?: string;
}

/** Get the authenticated user's profile */
export function getUserProfile(): Promise<UserProfileResponse> {
    return apiFetch<UserProfileResponse>("/api/user/profile");
}

/** Update the authenticated user's profile */
export function updateUserProfile(data: UpdateProfileRequest): Promise<UserProfileResponse> {
    return apiFetch<UserProfileResponse>("/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

// ─── Admin API ─────────────────────────────────────────────

/** Admin: Get all users */
export function getAllUsersAdmin(): Promise<UserProfileResponse[]> {
    return apiFetch<UserProfileResponse[]>("/api/admin/users");
}

/** Admin: Update user roles */
export function updateUserRolesAdmin(userId: number, roles: string[]): Promise<UserProfileResponse> {
    return apiFetch<UserProfileResponse>(`/api/admin/users/${userId}/roles`, {
        method: "PUT",
        body: JSON.stringify(roles),
    });
}

// ─── Products & Categories API ───────────────────────────────

export interface SubCategoryDTO {
    id: number;
    name: string;
    categoryId: number;
}

export interface CategoryDTO {
    id: number;
    name: string;
    subCategories: SubCategoryDTO[];
}

export function getAllCategoriesAPI(): Promise<CategoryDTO[]> {
    return apiFetch<CategoryDTO[]>("/api/categories");
}

export function getSubCategoriesAPI(categoryId: number): Promise<SubCategoryDTO[]> {
    return apiFetch<SubCategoryDTO[]>(`/api/categories/${categoryId}/subcategories`);
}

export function getProductsBySubCategoryAPI(subCategoryId: number): Promise<ProductResponse[]> {
    return apiFetch<ProductResponse[]>(`/api/subcategories/${subCategoryId}/products`);
}

export function getProductsByCategoryAPI(categoryName: string): Promise<ProductResponse[]> {
    return apiFetch<ProductResponse[]>(`/api/products/category/${encodeURIComponent(categoryName)}`);
}

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    categoryName?: string;
    subCategoryName?: string;
    imageUrl: string;
}

/** Get all products */
export function getAllProducts(): Promise<ProductResponse[]> {
    return apiFetch<ProductResponse[]>("/api/products");
}

/** Get latest products */
export function getLatestProductsAPI(): Promise<ProductResponse[]> {
    return apiFetch<ProductResponse[]>("/api/products/latest");
}

export interface AddProductRequest {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    subCategoryId: number;
    imageUrl: string;
}

export function addProductAPI(product: AddProductRequest): Promise<ProductResponse> {
    return apiFetch<ProductResponse>("/api/products", {
        method: "POST",
        body: JSON.stringify(product),
    });
}

export function updateProductAPI(id: number, product: AddProductRequest): Promise<ProductResponse> {
    return apiFetch<ProductResponse>(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
    });
}

// ─── Cart API ──────────────────────────────────────────────

export interface CartItemResponse {
    id: number;
    productId: number;
    productName: string;
    imageUrl: string;
    quantity: number;
    priceAtTime: number;
    itemTotal: number;
}

export interface CartResponse {
    items: CartItemResponse[];
    subtotal: number;
    totalItems: number;
}

export function addToCartAPI(productId: number, quantity: number = 1): Promise<CartResponse> {
    return apiFetch<CartResponse>(`/api/cart/add/${productId}?quantity=${quantity}`, {
        method: "POST",
    });
}

export function getCartAPI(): Promise<CartResponse> {
    return apiFetch<CartResponse>("/api/cart");
}

export function updateCartItemAPI(itemId: number, quantity: number): Promise<CartResponse> {
    return apiFetch<CartResponse>(`/api/cart/update/${itemId}?quantity=${quantity}`, {
        method: "PUT",
    });
}

export function removeFromCartAPI(itemId: number): Promise<CartResponse> {
    return apiFetch<CartResponse>(`/api/cart/remove/${itemId}`, {
        method: "DELETE",
    });
}
