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
