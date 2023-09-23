export interface conversationTypeDef {
    conversation_id:      string;
    to_user_id:           string;
    to_user_display_name: string;
    to_user_profile_image:string;
    to_user_blue:         boolean;
    to_user_username:     string;
    from_user_id:         string;
    latest_message_text:  string | null;
    latest_message_files: string[] | null;
    latest_message_date:  Date | string;
  }