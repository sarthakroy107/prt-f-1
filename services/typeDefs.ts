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

export interface chatObjectTypeDef {
  _id:                   string;
  sender_id:             string;
  text:                  string | null;
  files:                 string[] | null;
  created_at:            string;
}
export interface chat_sender_TypeDef {
  conversation_id:       string;
  to_user_id:            string;
  to_user_display_name:  string;
  to_user_profile_image: string;
  to_user_blue:          boolean;
  to_user_username:      string;
  from_user_id:          string;
}

export type autocomplete_search_results = {
  _id: string
  name: string
  profileImageUrl: string
  blue: string
  username: string
  bio?: string
  following?: boolean
}


export type  responseTweetDetailsType = {
  _id:                  string;
  author_display_name:  string;
  author_username:      string;
  author_profile_image: string;
  text:                 string   | null;
  files:                string[] | null;
  is_liked:             boolean;
  like_count:           number;
  is_retweeted:         boolean;
  retweet_count:        number;
  quotetweet_count:     number;
  reply_count:          number;
  is_sensitive:         boolean;
  in_reply:             boolean;
  in_reply_to_tweet_id: string   | null;
  in_reply_to_user_id:  string   | null;
  in_reply_to_username: string;
  created_at:           Date     | string;
  updated_at:           Date     | string;
  views_count:          number;
  is_following:        boolean;
  is_bookmarked:       boolean;
  bookmark_count:      number;
}