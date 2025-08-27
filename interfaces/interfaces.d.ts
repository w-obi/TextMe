interface Message {
    id: string;
    created_at: string;
    message: string | null;
    sender_id: string | null;
    document_title: string | null;
    storage_path: string | null;
    receiver_id: string;
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
    exit: () => void;
    isProfilePresent?: boolean;
    profile_picture_url?: string | null;
    username?: string | null;
}

interface Search {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (t: string) => void;
    disableSearch?: () => void;
    bgColor: string;
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
    chat_id: string;
    id: string | null;
    message: string | null;
    created_at: string | null;
    user_id: string;
    username: string;
    profile_picture_url: string;
}

interface TextUserButton {
    placeholder: string;
    value?: string;
    onChangeText?: (t: string) => void;
    bgColor: string;
    isTextPresent: boolean;
    onPressEnter?: () => void;
}

interface MessageComp {
    id: string;
    created_at: string;
    message: string;
    receiver_id: string;
    sender_id: string;
}

// interface GroupMessageComp {
//     id: string;
//     created_at: string;
//     message: string;
//     receiver_id: string;
//     receiver_profile_picture_url: string;
//     receiver_username: string;
//     sender_id: string;
//     sender_profile_picture_url: string;
//     sender_username: string;
// }

interface CurrentSection {
    key: string;
    title: string;
    data: MessageComp[];
}

// interface Themes {
//     default,
//     white,
//     blue,
//     red,
//     yellow,
//     green
// }