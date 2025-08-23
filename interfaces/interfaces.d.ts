interface Message {
    id: string;
    created_at: string;
    message: string | null;
    sender_id: string | null;
    document_title: string | null;
    storage_path: string | null;
}

interface User {
    id: string;
    created_at: string;
    username: string;
    profile_picture_url: string | null;
    email: string;
    contacts: string[] | null;
}

interface TopBar {
    bgColor: string;
    textColor: string;
    isSearchPresent: boolean;
    enableSearch?: () => void;
}

interface Search {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (t: string) => void;
    disableSearch?: () => void;
    bgColor: string;
}

interface UsersChat {
    user_id: string;
    username: string;
    email: string;
    last_message: string | null;
    last_message_time: string | null;
    profile_picture_url: string | null;
}

interface AddButton {
    onPress?: () => void;
    bgColor: string;
}

interface AddContactInput {
    onChangeText?: (t: string) => void;
    value: string;
    onPress?: () => void;
    onPress2?: () => void;
}

interface PreviewUserChat {
    username: string;
    last_message: string | null;
    last_message_time: string | null;
    profile_picture_url: string | null;
    onPress?: () => void;
}