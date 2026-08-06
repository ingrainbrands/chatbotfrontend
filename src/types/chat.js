/**
 * ==========================================================
 * Message Shape
 * ==========================================================
 */

export const MessageRole = {
    USER: "user",
    ASSISTANT: "assistant",
    SYSTEM: "system",
};

export const MessageStatus = {
    PENDING: "pending",
    SENDING: "sending",
    SENT: "sent",
    ERROR: "error",
};

/**
 * Message Object
 *
 * {
 *   id: string,
 *   role: "user" | "assistant",
 *   content: string,
 *   createdAt: Date,
 *   status: "pending" | "sending" | "sent" | "error",
 *   sources: [],
 *   feedback: null | "up" | "down"
 * }
 */

export const createMessage = ({
    role,
    content,
    sources = [],
}) => ({
    id: crypto.randomUUID(),
    role,
    content,
    sources,
    feedback: null,
    status: MessageStatus.SENT,
    createdAt: new Date(),
});

/**
 * ==========================================================
 * Source Shape
 * ==========================================================
 *
 * {
 *   title: string,
 *   url: string,
 *   score: number
 * }
 */

export const createSource = ({
    title = "",
    url = "",
    score = 0,
}) => ({
    title,
    url,
    score,
});

/**
 * ==========================================================
 * Chat Request
 * ==========================================================
 *
 * {
 *   message: string,
 *   session_id?: string
 * }
 */

export const createChatRequest = (
    message,
    sessionId = null
) => ({
    message,
    session_id: sessionId,
});

/**
 * ==========================================================
 * Chat Response
 * ==========================================================
 *
 * {
 *   answer: string,
 *   sources:[]
 * }
 */

export const createChatResponse = ({
    answer = "",
    sources = [],
}) => ({
    answer,
    sources,
});

/**
 * ==========================================================
 * Suggested Question
 * ==========================================================
 */

export const createSuggestion = (
    text,
    icon = null
) => ({
    id: crypto.randomUUID(),
    text,
    icon,
});

/**
 * ==========================================================
 * Widget State
 * ==========================================================
 */

export const WidgetState = {
    CLOSED: "closed",
    OPEN: "open",
    MINIMIZED: "minimized",
};