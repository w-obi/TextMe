interface Message {
    id: string,
    created_at: string,
    message: string,
    document_url: string,
    sender_id: string
}

interface User {
    id: string,
    created_at: string,
    username: string,
    profile_picture_url: string
}